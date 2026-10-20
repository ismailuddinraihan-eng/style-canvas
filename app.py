from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__, static_folder='.', static_url_path='')

# Database Initializer function (ডেটাবেজ ও টেবিল তৈরি করার জন্য)
def init_db():
    conn = sqlite3.connect('style_canvas.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

# API Route: ফ্রন্টএন্ড থেকে ইমেইল ও পাসওয়ার্ড রিসিভ করে ডেটাবেজে সেভ করবে
@app.route('/api/login', methods=['POST'])
def handle_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    try:
        conn = sqlite3.connect('style_canvas.db')
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, password))
        conn.commit()
        conn.close()
        return jsonify({"status": "success", "message": "Successfully saved to SQLite Database!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)