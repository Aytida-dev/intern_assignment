from flask import Blueprint, request, jsonify
from db_js import db

task_bp = Blueprint('task', __name__)

@task_bp.route('/', methods=['GET'])
def get_task_route():
    return jsonify({'message': 'task route'})

@task_bp.route('/allTasks', methods=['GET'])
def get_all_tasks():
    try:
        result = db.query('SELECT * FROM crud_db')
        return jsonify({'message': 'tasks fetched', 'tasks': result})
    except Exception as err:
        return jsonify({'message': str(err)}), 500

@task_bp.route('/addTask', methods=['POST'])
def add_task():
    data = request.get_json()
    task = data.get('task')
    if not task:
        return jsonify({'message': 'task cannot be empty'}), 400
    if len(task) > 255:
        return jsonify({'message': 'task cannot be more than 255 characters'}), 400
    try:
        db.query(f'INSERT INTO crud_db (task) VALUES ("{task}")')
        return jsonify({'message': 'task added', 'task': task})
    except Exception as err:
        return jsonify({'message': str(err)}), 500

@task_bp.route('/updateTask/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()
    task = data.get('task')
    if not task:
        return jsonify({'message': 'task cannot be empty'}), 400
    if len(task) > 255:
        return jsonify({'message': 'task cannot be more than 255 characters'}), 400
    try:
        db.query(f'UPDATE crud_db SET task = "{task}" WHERE id = {id}')
        return jsonify({'message': 'task updated'})
    except Exception as err:
        return jsonify({'message': str(err)}), 500

@task_bp.route('/deleteTask/<int:id>', methods=['DELETE'])
def delete_task(id):
    try:
        db.query('DELETE FROM crud_db WHERE id = ?', (id,))
        return jsonify({'message': 'task deleted'})
    except Exception as err:
        return jsonify({'message': str(err)}), 500

