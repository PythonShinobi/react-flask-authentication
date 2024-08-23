from flask import jsonify, request, make_response, session
from flask_login import login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash

from app import db, login_manager
from app.auth import bp
from app.models import User

@login_manager.user_loader
def load_user(user_id):
    user = db.get_or_404(User, user_id)
    return user

@bp.route('/protected', methods=['GET'])
@login_required
def protected_route():
    return jsonify({"message": "You are logged in!"}), 200

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Invalid data"}), 400

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Check if the username is already present in the database.
    username_check = db.session.execute(db.select(User).where(User.username == username))
    existing_username = username_check.scalar()
    if existing_username:
        return jsonify({"message": "Username already taken"}), 400

    # Check if the email is already present in the database.
    email_check = db.session.execute(db.select(User).where(User.email == email))
    existing_email = email_check.scalar()
    if existing_email:
        return jsonify({"message": "Email already registered"}), 400

    try:
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)
        new_user = User(
            username=username,
            email=email,
            password=hashed_password
        )
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        print(f"Error during registration: {e}")
        return jsonify({"message": "Server error during registration"}), 500

    response = make_response(jsonify({"message": "Registration successful✅", "username": new_user.username}))
    return response, 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Invalid data"}), 400

    username = data.get('username')
    password = data.get('password')   

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    try:
        result = db.session.execute(db.select(User).where(User.username == username))
        user = result.scalar()
    except Exception as e:
        return jsonify({"message": "An error occurred while fetching the user", "error": str(e)}), 500

    if not user or not check_password_hash(user.password, password):        
        return jsonify({"message": "Invalid email or password"}), 401
    
    login_user(user)
    session.permanent = True  # Mark the session as permanent

    response = jsonify({"message": "Login successful", "username": user.username})
    return response, 200

@bp.route('/logout')
@login_required
def logout():
    logout_user()
    session.clear()

    response = make_response(jsonify({'message': 'Logged out successfully'}), 200)
    return response