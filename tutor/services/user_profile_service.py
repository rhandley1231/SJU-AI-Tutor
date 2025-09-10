"""
User Profile Service

This module provides functions to retrieve user profile information
from the AWS DynamoDB Users table.
"""

import os
import boto3
from boto3.dynamodb.conditions import Attr
from typing import Dict, Optional
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Setup DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='us-east-2')

# Define table name
USERS_TABLE = 'Users'

def get_user_profile(sub: str) -> Optional[Dict]:
    """
    Retrieve user profile from DynamoDB Users table using sub (primary key).
    
    Args:
        sub: The user's sub (primary key)
        
    Returns:
        Dict containing user profile data or None if not found
    """
    try:
        table = dynamodb.Table(USERS_TABLE)
        
        # Query the table using sub as the primary key
        response = table.get_item(
            Key={
                'sub': sub
            }
        )
        
        if 'Item' in response:
            user_data = response['Item']
            logger.info(f"Retrieved user profile for sub: {sub}")
            return {
                'sub': user_data.get('sub', ''),
                'schoolEmail': user_data.get('schoolEmail', ''),
                'firstName': user_data.get('firstName', ''),
                'lastName': user_data.get('lastName', ''),
                'password': user_data.get('password', ''),
                'preferences': user_data.get('preferences', {}),
                # Add chapter scores
                'chapter1score': user_data.get('chapter1score', 0),
                'chapter2score': user_data.get('chapter2score', 0),
                'chapter3score': user_data.get('chapter3score', 0),
                'chapter4score': user_data.get('chapter4score', 0),
                'chapter5score': user_data.get('chapter5score', 0),
                'chapter6score': user_data.get('chapter6score', 0),
                'chapter7score': user_data.get('chapter7score', 0),
                'chapter8score': user_data.get('chapter8score', 0),
                'chapter9score': user_data.get('chapter9score', 0),
                'chapter10score': user_data.get('chapter10score', 0),
            }
        else:
            logger.warning(f"No user profile found for sub: {sub}")
            return None
            
    except Exception as e:
        logger.error(f"Error retrieving user profile for sub {sub}: {str(e)}")
        return None

def get_user_profile_by_email(email: str) -> Optional[Dict]:
    """
    Retrieve user profile from DynamoDB Users table by scanning for schoolEmail.
    Note: This is less efficient than using sub as primary key.
    
    Args:
        email: The user's school email address
        
    Returns:
        Dict containing user profile data or None if not found
    """
    try:
        table = dynamodb.Table(USERS_TABLE)
        
        # Scan the table for matching schoolEmail
        response = table.scan(
            FilterExpression=Attr('schoolEmail').eq(email)
        )
        
        items = response.get('Items', [])
        if items:
            user_data = items[0]  # Take first match
            logger.info(f"Retrieved user profile for email: {email}")
            return {
                'sub': user_data.get('sub', ''),
                'schoolEmail': user_data.get('schoolEmail', ''),
                'firstName': user_data.get('firstName', ''),
                'lastName': user_data.get('lastName', ''),
                'password': user_data.get('password', ''),
                'preferences': user_data.get('preferences', {}),
                # Add chapter scores
                'chapter1score': user_data.get('chapter1score', 0),
                'chapter2score': user_data.get('chapter2score', 0),
                'chapter3score': user_data.get('chapter3score', 0),
                'chapter4score': user_data.get('chapter4score', 0),
                'chapter5score': user_data.get('chapter5score', 0),
                'chapter6score': user_data.get('chapter6score', 0),
                'chapter7score': user_data.get('chapter7score', 0),
                'chapter8score': user_data.get('chapter8score', 0),
                'chapter9score': user_data.get('chapter9score', 0),
                'chapter10score': user_data.get('chapter10score', 0),
            }
        else:
            logger.warning(f"No user profile found for email: {email}")
            return None
            
    except Exception as e:
        logger.error(f"Error retrieving user profile for email {email}: {str(e)}")
        return None

def get_full_user_profile(email: str) -> Dict:
    """
    Get complete user profile with fallback values.
    
    Args:
        email: The user's school email address
        
    Returns:
        Dict containing complete user profile with defaults
    """
    profile = get_user_profile_by_email(email)
    
    if profile:
        return profile
    else:
        # Return default profile if user not found in DB
        logger.warning(f"Using default profile for {email}")
        return {
            'schoolEmail': email,
            'firstName': 'Student',  # Default fallback
            'lastName': '',
            'sub': email,  # Use email as fallback sub
        }