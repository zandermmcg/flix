import requests
import boto3
import os
from dotenv import load_dotenv
from time import sleep
from tqdm import tqdm # type: ignore

# Load environment variables from .env file
load_dotenv(".env")

API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE = "https://api.themoviedb.org/3"
DYNAMO_TABLE = "flix"

# dynamodb = boto3.resource("dynamodb")
# table = dynamodb.Table(DYNAMO_TABLE)

def fetch_by_id(id, type):
    url = f"{TMDB_BASE}/{type}/{id}"
    params = {
        "api_key": API_KEY,
        "language": "en-US"
    }
    r = requests.get(url, params=params)
    return r.json()

def transform(media, media_type):
    return {
        "mediaId": str(media["id"]),
        "type": media_type,
        "title": media.get("title") or media.get("name"),
        "releaseDate": media.get("release_date") or media.get("first_air_date"),
        "overview": media.get("overview", ""),
        "posterUrl": media.get("poster_path", ""),
        "popularity": media.get("popularity", 0),
        "voteAverage": media.get("vote_average", 0),
        "voteCount": media.get("vote_count", 0),
    }

def fetch_discover(media_type, page):
    url = f"{TMDB_BASE}/discover/{media_type}"
    params = {
        "api_key": API_KEY,
        "language": "en-US",
        "sort-by": "popularity.desc",
        "include_adult": True,
        "page": page
    }
    r = requests.get(url, params=params)
    return r.json()

def search_by_title(title):
    url = f"{TMDB_BASE}/search/movie"
    params = {
        "api_key": API_KEY,
        "language": "en-US",
        "sort-by": "popularity.desc",
        "include_adult": True,
        "query": title
    }
    r = requests.get(url, params=params)
    return r.json()

# 1468452 IS THE BIGGEST ID
def searchall_movies(start, stop=1468452):
    items = []
    for id in tqdm(range(start, stop)):
        print(id)
        try:
            movie = fetch_by_id(id, "movie")
            items.append(transform(movie, "movie"))
            sleep(0.025)
        except:
            continue

# print(search_by_title("The Woman in the Yard"))

# movies = fetch_discover("movie", 3)['results']
# movies = fetch_discover("movie", 1)
# print(max([movie["id"] for movie in movies]))

# def put_batch(items):
#     with table.batch_writer() as batch:
#         for item in items:
#             batch.put_item(Item=item)

# def fetch_and_store_all(media_type, max_pages=500):
#     for page in tqdm(range(1, max_pages + 1)):
#         data = fetch_discover(media_type, page)
#         results = data.get("results", [])
#         if not results:
#             break
#         items = [transform(m, media_type) for m in results]
#         put_batch(items)
#         sleep(0.25)

# session = boto3.Session(
#     aws_access_key_id='',
#     aws_secret_access_key='',
#     region_name='us-east-1'
# )

# dynamodb = session.resource('dynamodb')
# table = dynamodb.Table('flix')

# response = table.query(KeyConditionExpression=boto3.dynamodb.conditions.Key('pk').eq('USER#001') &
#                                               boto3.dynamodb.conditions.Key('sk').eq('PROFILE'))

# items = response["Items"]
# print(items)



# table = dynamodb.Table('flix')

# item = {
#     'pk': "USER#001",
#     'sk': "PROFILE",
#     'username': "contrambulance"
# }

# # Put the item into the table
# response = table.put_item(Item=item)

# # Print response
# print("PutItem succeeded:", response)