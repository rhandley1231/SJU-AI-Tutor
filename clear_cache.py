#!/usr/bin/env python3
"""
Cache Clearing Utility

This script clears the SQLite database used by LangGraph for conversation state.
This is useful when you need to reset all conversation history and profiles.
"""

import os
import sqlite3
import argparse

# Default database path
DEFAULT_STATE_DB = "tutor_state.db"

def clear_conversation_cache(db_path: str = None):
    """
    Clear all conversation state from the SQLite database.
    
    Args:
        db_path: Path to the SQLite database file. Uses STATE_DB if not provided.
    """
    if db_path is None:
        db_path = DEFAULT_STATE_DB
    
    if not os.path.exists(db_path):
        print(f"Database file {db_path} does not exist. Nothing to clear.")
        return
    
    try:
        # Connect to the database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Get list of tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        if not tables:
            print("No tables found in the database.")
            return
        
        # Clear all tables
        for table in tables:
            table_name = table[0]
            cursor.execute(f"DELETE FROM {table_name}")
            deleted_count = cursor.rowcount
            print(f"Cleared {deleted_count} records from table: {table_name}")
        
        # Commit changes and close connection
        conn.commit()
        conn.close()
        
        print(f"Successfully cleared all conversation cache from {db_path}")
        
    except Exception as e:
        print(f"Error clearing cache: {str(e)}")

def main():
    parser = argparse.ArgumentParser(description='Clear conversation cache database')
    parser.add_argument('--db-path', help='Path to SQLite database file')
    parser.add_argument('--force', action='store_true', help='Skip confirmation prompt')
    
    args = parser.parse_args()
    
    db_path = args.db_path or DEFAULT_STATE_DB
    
    if not args.force:
        response = input(f"Are you sure you want to clear all conversation data from {db_path}? (y/N): ")
        if response.lower() != 'y':
            print("Operation cancelled.")
            return
    
    clear_conversation_cache(db_path)

if __name__ == "__main__":
    main()