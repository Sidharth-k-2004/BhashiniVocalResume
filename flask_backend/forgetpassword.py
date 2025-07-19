from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from werkzeug.security import generate_password_hash, check_password_hash
import random
import string
import datetime

# Initialize Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configure Flask-Mail (Use App Password if using Gmail)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your_app_password'  # Use App Password
app.config['MAIL_DEFAULT_SENDER'] = 'your_email@gmail.com'

# Initialize Extensions
db = SQLAlchemy(app)
mail = Mail(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

# Reset Code Model
class PasswordResetCode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    code = db.Column(db.String(10), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

# Send reset code via email
def send_reset_email(to_email, reset_code):
    msg = Message('Your Password Reset Code', recipients=[to_email])
    msg.body = f'Your password reset code is: {reset_code}\n\nThis code is valid for 15 minutes.'
    mail.send(msg)

# Endpoint: Request password reset
@app.route('/api/request-password-reset', methods=['POST'])
def request_password_reset():
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "No user found with that email"}), 404

    reset_code = ''.join(random.choices(string.digits, k=6))  # 6-digit numeric code

    # Delete any existing reset code for this email
    PasswordResetCode.query.filter_by(email=email).delete()

    # Save new reset code
    db.session.add(PasswordResetCode(email=email, code=reset_code))
    db.session.commit()

    try:
        send_reset_email(email, reset_code)
        return jsonify({"message": "Reset code sent to your email"}), 200
    except Exception as e:
        return jsonify({"message": "Failed to send email", "error": str(e)}), 500

# Endpoint: Verify reset code
@app.route('/api/verify-reset-code', methods=['POST'])
def verify_reset_code():
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')

    record = PasswordResetCode.query.filter_by(email=email, code=code).first()
    if not record:
        return jsonify({"message": "Invalid reset code"}), 400

    # Check if code is expired (>15 minutes)
    if datetime.datetime.utcnow() - record.created_at > datetime.timedelta(minutes=15):
        db.session.delete(record)
        db.session.commit()
        return jsonify({"message": "Reset code expired"}), 400

    return jsonify({"message": "Reset code verified"}), 200

# Endpoint: Reset password
@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('newPassword')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    user.password = generate_password_hash(new_password)
    db.session.commit()

    # Delete the reset code
    PasswordResetCode.query.filter_by(email=email).delete()
    db.session.commit()

    return jsonify({"message": "Password has been reset successfully"}), 200

# Endpoint: Signup (optional for testing)
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 409

    hashed = generate_password_hash(password)
    user = User(email=email, password=hashed)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered"}), 201

# Run and initialize DB
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
