from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
from sqlalchemy_utils import PhoneNumber


class BusinessCategory(db.Model):
    __tablename__ = 'business_categories'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)

    businesses = db.relationship('Business', backref='business_categories')
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }
