from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img = db.Column(db.String(255), nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), nullable=False)

    reviews = db.relationship('Review', cascade='all,delete', backref='users')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "hashed_password": self.hashed_password,
            "profile_img": self.profile_img,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
