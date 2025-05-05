import requests
import boto3
import os
from dotenv import load_dotenv
from time import sleep

# Load environment variables from .env file
load_dotenv(".env")

API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE = "https://api.themoviedb.org/3"
DYNAMO_TABLE = "flix"

def get_newest(type):
    url = f'{TMDB_BASE}/{type}/latest'
    params = {
        "api_key": API_KEY,
        "language": "en-US"
    }
    r = requests.get(url, params=params)
    return r.json()

def put_update(items):
    session = boto3.Session(
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name='us-east-1'
    )

    dynamodb = session.resource("dynamodb")
    table = dynamodb.Table(DYNAMO_TABLE)
    return