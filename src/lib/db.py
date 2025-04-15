import boto3
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv(".env")

# Retrieve AWS credentials from environment variables
access_key = os.getenv("AWS_ACCESS_KEY")
secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")

# Initlize boto3 session with credentials
session = boto3.Session(
    aws_access_key_id = access_key,
    aws_secret_access_key = secret_key,
    region_name="us-east-1",
)

dynamodb = session.resource('dynamodb')
table = dynamodb.Table('flix')

response = table.query(KeyConditionExpression=boto3.dynamodb.conditions.Key('pk').eq('USER#001') &
                                              boto3.dynamodb.conditions.Key('sk').begins_with('PROFILE'))     

items = response['Items']
print(items) 
if items[0]['username']:
    print(f'Username: {items[0]["username"]}')