import os
import sqlite3
from flask import Flask, render_template, request, jsonify

# Tell Flask to look for HTML files in the current folder instead of 'templates' folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, template_folder=BASE_DIR, static_folder=BASE_DIR, static_url_path='')

# Database Initializer
def init_db():
    db_path = os.path.join(BASE_DIR, 'style_canvas.db')
    conn = sqlite3.connect(db_path)
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

init_db()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/login', methods=['POST'])
def handle_login():
    data = request.get_json()
    email = data.get('email', '')
    password = data.get('password', '')

    try:
        db_path = os.path.join(BASE_DIR, 'style_canvas.db')
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, password))
        conn.commit()
        conn.close()
        return jsonify({"status": "success", "message": "Successfully saved to SQLite Database!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
