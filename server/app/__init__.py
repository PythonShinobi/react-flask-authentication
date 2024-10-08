import os
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

from config import Config

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
login_manager.login_view = "auth.login"

def create_app(config=Config):    
    # Set a writable instance path
    instance_path = '/tmp/instance'
    
    # Ensure the writable path exists
    if not os.path.exists(instance_path):
        os.makedirs(instance_path)

    flask_app = Flask(
        __name__, 
        instance_path=instance_path, 
        instance_relative_config=True
    )
    flask_app.config.from_object(config)

    db.init_app(flask_app)
    migrate.init_app(flask_app, db)
    login_manager.init_app(flask_app)    

    # Initialize CORS with your frontend URL
    CORS(flask_app, resources={r"/*": {"origins": "https://react-flask-authentication.vercel.app", "supports_credentials": True}})    

    # Register the authentication blueprint.
    from app.auth import bp as auth_bp
    flask_app.register_blueprint(auth_bp, url_prefix="/api")

    # Setup logging
    if not flask_app.debug:
        log_path = '/tmp/error.log'  # Use a writable path
        handler = RotatingFileHandler(log_path, maxBytes=10240, backupCount=1)
        handler.setLevel(logging.ERROR)
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        flask_app.logger.addHandler(handler)

    return flask_app

from app import models