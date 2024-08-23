import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))

ENV = ".env"

load_dotenv(ENV)

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", 'you-will-never-guess')
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or f'sqlite:///{os.path.join(basedir, "app.db")}'
    FRONTEND_ENDPOINT = os.getenv("FRONTEND_ENDPOINT")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # API settings
    ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")

class TestConfig(Config):
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'  # Using SQLite for testing
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'testsecretkey'