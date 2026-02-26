import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "analytics.db")

def get_connection():
    return sqlite3.connect(DB_PATH)

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS scans (
            id                INTEGER PRIMARY KEY AUTOINCREMENT,
            total_score       INTEGER,
            keyword_score     INTEGER,
            section_score     INTEGER,
            formatting_score  INTEGER,
            readability_score INTEGER,
            created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def save_scan(scores: dict):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO scans (total_score, keyword_score, section_score, formatting_score, readability_score)
        VALUES (?, ?, ?, ?, ?)
    """, (
        scores["total_score"],
        scores["keyword_score"],
        scores["section_score"],
        scores["formatting_score"],
        scores["readability_score"],
    ))
    conn.commit()
    conn.close()