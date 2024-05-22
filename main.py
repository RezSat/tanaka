from collections import defaultdict
from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from flask_socketio import SocketIO, join_room, leave_room, emit, rooms
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import json
from MathsbotAPI import generate_random_questions
from sympy import latex, simplify
from sympy.parsing.latex import parse_latex
import google.generativeai as genai
import uuid
import time
import base64
import json
import os
from dotenv import load_dotenv
 
load_dotenv() 
app = Flask(__name__)
app.secret_key = 'HAHATHESECRETKEYISHERE'
app.config['DATABASE'] = 'database.db'
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-pro')
socketio = SocketIO(app)

levels = {
    'easy': (1,4),
    'medium': (5,7),
    'hard': (8,10)
}

rooms_ = {}
# rooms -> {id: [plyaer1, player2], id: [user1, player2]}

def generate_unique_room_id():
    unique_id = str(uuid.uuid4())  
    timestamp = str(int(time.time()))  
    room_id = unique_id + timestamp
    return room_id

def get_db():
    conn = sqlite3.connect(app.config['DATABASE'])
    conn.row_factory = sqlite3.Row
    return conn

@socketio.on('connect')
def test_connect():
    emit('after connect',  {'data':'Lets dance'})

@socketio.on('create room')
def handle_create_room():
    room_id = generate_unique_room_id()
    rooms_[room_id] = []
    rooms_[room_id].append(request.sid)
    #print(rooms)
    join_room(room_id)
    socketio.emit('room created', {'room_id': room_id})

@socketio.on('join room')
def handle_join_room(data):
    room_id = data['room_id']

    if (room_id in rooms_.keys()) and len(rooms_[room_id]) >= 2:
        print("Error: Room is full")
        return jsonify({'error': 'Room is full'}), 400
    
    if room_id in rooms_.keys():
        join_room(room_id)
        rooms_[room_id].append(request.sid)
        #print(room_id,rooms)
        socketio.emit('room joined', {'room_id': room_id, 'sid': request.sid})

@socketio.on('message')
def handle_message(data):
    room_id = data['room_id']
    if request.sid in  rooms_[room_id]:
        message = f"Question 1: posted to {room_id} by {request.sid}"
        socketio.emit('question', {'question': message, 'room_id': room_id})

@socketio.on('timer change')
def handle_timer_change(data):
    room = data['room_id']
    timer = data['timer']
    sender_id = data['sender_id']

    friend_id = rooms_[room][1] if sender_id == rooms_[room][0] else rooms_[room][0]
    socketio.emit('friend timer', {'timer': timer, 'room_id': room, 'receiver_id': friend_id})

@socketio.on('number of questions changed')
def handle_number_of_questions_change(data):
    room = data['room_id']
    number = data['number']
    sender_id = data['sender_id']

    friend_id = rooms_[room][1] if sender_id == rooms_[room][0] else rooms_[room][0]
    socketio.emit('friend number of questions', {'number': number, 'room_id': room, 'receiver_id': friend_id})

@socketio.on('question request')
def handle_question_request(data):
    room = data['room_id']
    min_lvl, max_lvl = levels[data['level']]
    dict_ = generate_random_questions(min_lvl, max_lvl, number_of_questions=25, topic=0)
    array = []
    for i,j in zip(dict_['questions'], dict_['topics']):
        new = generate_random_questions(min_lvl, max_lvl, number_of_questions=3, topic=j)
        need = new['questions']
        i['more'] = [k['answer'] for k in need]
        array.append(i)
    socketio.emit('receive question', {'questions': array, 'room_id': room})

@socketio.on('send score')
def handle_send_score(data):
    room = data['room_id']
    score = data['score']
    sender_id = data['sender_id']
    friend_id = rooms_[room][1] if sender_id == rooms_[room][0] else rooms_[room][0]
    socketio.emit('friend score', {'score': score, 'room_id': room, 'receiver_id': friend_id})

@app.route('/room/<room_id>', methods=['GET', 'POST'])
def _join_room(room_id):
    """    if len(rooms[room_id]) >= 2:
        return jsonify({'error': 'Room is full'}), 400
    join_room(room_id)
    rooms[room_id].append(request.sid)
    socketio.emit('room_joined', {'room_id': room_id}, room=room_id)"""
    
    if request.method == "GET":
        timer = request.args.get('timer')
        level = request.args.get('level')
   
    return render_template('room.html', timer=timer, level=level)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username'].lower()
        password = request.form['password']
        
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
        user = cursor.fetchone()
        conn.close()
        
        if user and check_password_hash(user['password'], password):
            session['user_id'] = user['id']
            session['username'] = user['username'].lower()
            flash('Login successful!', 'success')
            return redirect(url_for('start'))
        else:
            flash('Invalid username or password', 'danger')
    
    return render_template('login.html')

@app.route('/login_status', methods=['GET'])
def login_status():
    if 'user_id' in session:
        return jsonify({'logged_in': True})
    else:
        return jsonify({'logged_in': False})

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username'].lower()
        password = request.form['password']
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        
        conn = get_db()
        cursor = conn.cursor()
        try:
            cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, hashed_password))
            conn.commit()
            flash('Signup successful! Please log in.', 'success')
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            flash('Username already exists!', 'danger')
        finally:
            conn.close()
    
    return render_template('signup.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    flash('You have been logged out.', 'success')
    return redirect(url_for('login'))

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        flash('Please log in to access this page.', 'warning')
        return redirect(url_for('login'))
    
    user_id = session['user_id']
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT high_score FROM users WHERE id = ?", (user_id,))
    high_score = cursor.fetchone()['high_score']
    cursor.execute("SELECT problems FROM users WHERE id = ?", (user_id,))
    problems = cursor.fetchone()['problems']
    conn.close()
    
    problems = json.loads(problems) if problems else []
    if problems == [] and (high_score == 0 or high_score==None):
        return "Play your first game"    
    return render_template('dashboard.html', username=session['username'], high_score=high_score, problems=problems)


def update_high_score(new_high_score):
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    user_id = session['user_id']    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT high_score FROM users WHERE id = ?", (user_id,))
    high_score = cursor.fetchone()['high_score']
    if int(high_score) < int(new_high_score):
        print(new_high_score)
        cursor.execute("UPDATE users SET high_score = ? WHERE id = ?", (new_high_score, user_id))
        conn.commit()
    conn.close()
    
    return jsonify({'success': True})

@app.route('/save_problem', methods=['POST'])
def save_problem():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    problem = request.json['problem']
    user_id = session['user_id']
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT problems FROM users WHERE id = ?", (user_id,))
    result = cursor.fetchone()
    problems = json.loads(result['problems']) if result and result['problems'] else []
    problems.append(problem)
    
    cursor.execute("UPDATE users SET problems = ? WHERE id = ?", (json.dumps(problems), user_id))
    conn.commit()
    conn.close()
    
    return jsonify({'success': True})


@app.route('/start')
def start():
    return render_template('start.html')

@app.route('/guest')
def guest():
    return render_template('start.html')

@app.route('/individual', methods=['POST', 'GET'])
def individual():
    if request.method == "GET":
        timer = request.args.get('timer')
        level = request.args.get('level')

    return render_template('individual.html', timer=timer, level=level.lower())

@app.route('/friend', methods=['POST', 'GET'])
def friend():
    if request.method == "GET":
        timer = request.args.get('timer')
        level = request.args.get('level')
        friendMode = request.args.get('friendMode')
    return render_template('friend.html', timer=timer, level=level)


@app.route('/results', methods=['POST'])
def results():
    data = request.json
    self_winner = " "
    update_high_score(data['no_of_questions_correct'])
    if 'friend_score' in data.keys():
        print('came here')
        print(data['friend_score'], data['no_of_questions_correct'])
        if int(data['no_of_questions_correct']) > int(data['friend_score']):
            self_winner = "Congratulations! You won!"
        elif int(data['no_of_questions_correct']) < int(data['friend_score']):
            self_winner = "Sorry! You lost!"
        else:
            self_winner = "It's a tie!"

        print(self_winner)

        return render_template('results.html', data=data, self_winner=self_winner)
    return render_template('results.html', data=data)

@app.route('/getq', methods=['GET'])
def get_question():
    min_lvl, max_lvl = levels[request.args.get('level')]
    dict_ = generate_random_questions(min_lvl, max_lvl, number_of_questions=request.args.get('n'), topic=0)
    array = []
    for i,j in zip(dict_['questions'], dict_['topics']):
        new = generate_random_questions(min_lvl, max_lvl, number_of_questions=3, topic=j)
        need = new['questions']
        i['more'] = [k['answer'] for k in need]
        array.append(i)
    return jsonify(array)

@app.route('/check_equality', methods=['POST'])
def check_equality():
    latex_expr1 = request.json['expr1']
    latex_expr2 = request.json['expr2']
    
    tex = f"""
    are these two mathematically equal, if a decimal is out of phase then it is not equal okay?
    considering these two expressions mathematically tell me that {latex_expr1} and {latex_expr2} are equal or not, 
    if equal reply me with 'yes' if not equal then reply me with 'no'. Do not reply me anything else just strictly 'yes' or 'no' are the only answers you can give,
    because i am using your answer to determine whether the two expressions are equal or not programmatically hence you must only answer me with 'yes' or 'no'.
    so i will ask again are these two expressions equal: {latex_expr1} and {latex_expr2}?
    """
    response = model.generate_content(tex)
    
    return jsonify({'result': response.text})


@app.route('/explain_problem', methods=['POST'])
def explain_problem():
    problem = request.json['problem']
    text = f"""
    Here is the problem you need to explain: {problem['question']}
    here is the answer for the above problem : {problem['answer']}

    some note to keep in mind when trying to explain the above: the question or answer might not be in some basic text format, isntead it probably
    will be in latex or html format, this is make the question or answer more clear when rendering to the user from the frontend. Therefore it might even contain
    things like tables and svgs, drawings of triangles, so read them carefully and please try to provide text based answers even though both the question and answer above are not in text based
    i need the explanation of yours to be in normal text, even if the problem is to  fill in the table or trianlge or circle related i want you to find some way to explain the problem in simple text
    so please explain the above problems to the student.
    """
    response = model.generate_content(text)
    return jsonify({'result': response.text})


def create_app():
    with get_db() as db:
        db.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                high_score INTEGER DEFAULT 0,
                problems TEXT DEFAULT '[]'
            )
        ''')

    return app

"""
if __name__ == '__main__':
    app = create_app()
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
"""