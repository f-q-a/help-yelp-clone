from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
from sqlalchemy_utils import PhoneNumber


class Service(db.Model):
    __tablename__ = 'services'
    
    id = db.Column(db.Integer, primary_key=True)
    desc = db.Column(db.String(255), nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), nullable=False)

    businesses = db.relationship('BusinessService', backref='services')

    def to_dict(self):
        return {
            "id": self.id,
            "desc": self.desc,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
