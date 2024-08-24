import os
from dotenv import load_dotenv
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))

ENV = ".env"

load_dotenv(ENV)

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", 'you-will-never-guess')
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or f'sqlite:///{os.path.join(basedir, "app.db")}'
    FRONTEND_ENDPOINT = os.getenv("FRONTEND_ENDPOINT")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Session settings    
    SESSION_COOKIE_SECURE = False  # Set to True in production with HTTPS
    PERMANENT_SESSION_LIFETIME = timedelta(days=30)  # Set session lifetime to 1 minute
    REMEMBER_COOKIE_SECURE = True  # Only send cookies over HTTPS
    REMEMBER_COOKIE_HTTPONLY = True  # JavaScript cannot access the cookie
    REMEMBER_COOKIE_DURATION = timedelta(days=30)  # Set remember me cookie duration to 1 minute

class TestConfig(Config):
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'  # Using SQLite for testing
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'testsecretkey'