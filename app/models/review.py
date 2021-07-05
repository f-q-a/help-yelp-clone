from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
from sqlalchemy_utils import PhoneNumber


class Review(db.Model):
    __tablename__ = 'reviews'
    __table_args__ = (db.PrimaryKeyConstraint('user_id', 'business_id'), )

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey(
        'businesses.id'), nullable=False)
    body = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), nullable=False)

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "business_id": self.business_id,
            "body": self.body,
            "rating": self.rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
