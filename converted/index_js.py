from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from taskRouter_js import task_bp

load_dotenv()

app = Flask(__name__)
CORS(app)

port = os.getenv('PORT')

app.register_blueprint(task_bp, url_prefix='/task')

@app.route('/', methods=['GET'])
def home():
    return jsonify(message='server running smoothly')

if __name__ == '__main__':
    app.run(port=port, debug=True)