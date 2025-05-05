import requests
import boto3
import os
import json
import signal
from dotenv import load_dotenv
from tqdm import tqdm # type: ignore
from ratelimit import limits, sleep_and_retry

# Load environment variables from .env file
load_dotenv(".env")

API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE = "https://api.themoviedb.org/3"
DYNAMO_TABLE = "flix"
CHECKPOINT_FILE = "populator_checkpoint.json"
SHUTDOWN_REQUESTED = False

if not API_KEY:
    raise EnvironmentError("TMDB_API_KEY not defined in .env or cannot be accessed.")

# Setup DynamoDB Table session
session = boto3.Session(
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name='us-east-1'
)

dynamodb = session.resource("dynamodb")
table = dynamodb.Table(DYNAMO_TABLE)

def handle_shutdown(signum: int, frame: any) -> None:
    '''
    @brief      Handles controlled program shutdowns by setting SHUTDOWN_REQUESTED var.
    @param[in]  signum  Integer representing the signal that was received.
                        signal.SIGINT (2)   -> interrupt, e.g. Ctrl+C
                        signal.SIGTERM (15) -> termination request
                frame   Frame object representing the current point in the program.
    @return     None
    @note       
    '''
    global SHUTDOWN_REQUESTED
    SHUTDOWN_REQUESTED = True

# Register signal handlers for controlled shutdowns
signal.signal(signal.SIGINT, handle_shutdown)   # Ctrl+C
signal.signal(signal.SIGTERM, handle_shutdown)  # Docker/EC2 shutdown

def save_checkpoint(last: int) -> None:
    '''
    @brief      Save a checkpoint of the last known media ID that was processed.
    @param[in]  last        The last ID number that was processed.
    @return     None
    @exception  ValueError  If last is negative
    @note       Saves to a file called "populator_checkpoint.json".
    '''
    if last < 0:
        raise ValueError("id must be non-negative")

    json.dump({"last_id": last}, open(CHECKPOINT_FILE, "w"))

def load_checkpoint() -> None:
    '''
    @brief      Loads the last checkpoint saved
    @param[in]  None
    @return     Integer representing the last ID number that was saved.
    @note       If no checkpoints have ever been saved, returns -1.
    '''
    try:
        with open(CHECKPOINT_FILE) as fp:
            return json.load(fp)["last_id"]
    except FileNotFoundError:
        return -1

def put_batch(items: list[dict]) -> None:
    '''
    @brief      Put a batch of items into the DyanmoDB Table.
    @param[in]  items   List of JSON objects to be put in DynamoDB Table.
    @return     None
    @note       Batch size should be <= 25 (generally good practice).
    '''
    with table.batch_writer() as batch:
        for item in items:
            batch.put_item(Item=item)

@sleep_and_retry                # Upon reaching limit (below), sleep until new window
@limits(calls=48, period=1)     # Limit to 48 calls per second to keep under rate limits (50/sec)
def fetch_by_id(id: int, type: str) -> dict[str, any]:
    '''
    @brief      Fetch a media by its ID from TMDB API.
    @param[in]  id      ID of the media whose data is being fetched.
                type    Specifies type of media ("movie" or "tv").
    @return     JSON recieved from the API.
    @exception  ValueError  If id is negative.
    @note       Limited to 48 calls a second to adhere to API rate limits.
    '''
    if id < 0:
        raise ValueError("id must be non-negative")

    url = f"{TMDB_BASE}/{type}/{id}"
    params = {
        "api_key": API_KEY,
        "language": "en-US"
    }
    r = requests.get(url, params=params)
    return r.json()

def transform(media: dict[str, any], media_type: str) -> dict[str, any]:
    '''
    @brief      Transform data from the API into how it should be structured
                in the DynamoDB table.
    @param[in]  media
                media_type
    @return     Transformed dictionary/JSON object.
    @note
    '''
    # Use .get() to control default values (in case attribute not found)
    return {
        "pk": f"{media_type.upper()}#{media["id"]}",
        "sk": "INFO",
        "id": media["id"],
        "title": media.get("title"),
        "releaseDate": media.get("release_date", ""),
        "overview": media.get("overview", ""),
        "runtime": media.get("runtime", 0),
        "rating": media.get("vote_average", 0),
        "coverUrlPath": media.get("poster_path", ""),
        "budget": media.get("budget", 0),
        "revenue": media.get("revenue", 0),
        "genres": [g["name"] for g in media.get("genres", [])],
        "originCountry": media.get("origin_country", []),
        "productionCompanies": media.get("production_companies", []),
        "spokenLanguages": [l["name"] for l in media.get("spoken_languages", [])]
    }

def searchall_movies(start: int=0, stop: int=1468452) -> None:
    '''
    @brief      Search TMDB database by movie IDs and put found movie data into
                DynamoDB Database. Does this by linearly searching all possible 
                movie IDs.
    @param[in]  start   Movie ID to start searching at.
                stop    Movie ID to stop searching at (default max).
    @return     None
    @note       1468452 is the (known) biggest possible movie ID.
    '''
    global SHUTDOWN_REQUESTED
    items = []
    for id in tqdm(range(start, stop)):
        if SHUTDOWN_REQUESTED:
            print("Shutdown requested. Writing last items...")
            if len(items) > 0:
                put_batch(items)
            print("Saving checkpoint...")
            save_checkpoint(id)
            break
        
        try:
            movie = fetch_by_id(id, "movie")

            if movie["imdb_id"]:
                items.append(transform(movie, "movie"))

            # Write batch to database if batch size >= 25
            if len(items) >= 25:
                put_batch(items)
                items = []

            # Save checkpoint every 500 movies
            if id % 500 == 0:
                save_checkpoint(id)
        except:     # Catches IDs that don't map to any movie in TMDB Database
            continue
    
    # Write last items if end is reached
    if len(items) > 0:
        put_batch(items)

if __name__ == '__main__':
    last = load_checkpoint()
    # searchall_movies(last+1)


# movie = fetch_by_id(726429, "movie")
# movie = search_by_title("Star Wars")["results"][0]
# pretty_json = json.dumps(transform(movie, "movie"), indent=4)
# print(pretty_json)

### UNUSED FUNCTIONS ###

# def fetch_discover(media_type: str, page: int) -> list[dict]:
#     url = f"{TMDB_BASE}/discover/{media_type}"
#     params = {
#         "api_key": API_KEY,
#         "language": "en-US",
#         "sort-by": "popularity.desc",
#         "include_adult": True,
#         "page": page
#     }
#     r = requests.get(url, params=params)
#     return r.json()
#
# def search_by_title(title: str) -> list[dict]:
#     url = f"{TMDB_BASE}/search/movie"
#     params = {
#         "api_key": API_KEY,
#         "language": "en-US",
#         "sort-by": "popularity.desc",
#         "include_adult": True,
#         "query": title
#     }
#     r = requests.get(url, params=params)
#     return r.json()