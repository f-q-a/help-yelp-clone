from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
from sqlalchemy.orm import composite
from sqlalchemy_utils import PhoneNumber


class Business(db.Model):
    __tablename__ = 'businesses'
    id = db.Column(db.Integer, primary_key=True)
    business_name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    # latitude = db.Column(db.Float(precision=53), nullable=False)
    # longitude = db.Column(db.Float(precision=53), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        'business_categories.id'), nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    business_img = db.Column(db.String(255), nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), nullable=False)

    reviews = db.relationship('Review', cascade='all,delete', backref="businesses")
    service_ids = db.relationship('BusinessService', cascade='all,delete', backref="businesses")

    def to_dict(self):
        return {
            "id": self.id,
            "business_name": self.business_name,
            "address": self.address,
            # "latitude": self.latitude,
            # "longitude": self.longitude,
            "city": self.city,
            "state": self.state,
            "zipcode": self.zipcode,
            "category_id": self.category_id,
            "phone_number": self.phone_number,
            "business_img": self.business_img,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
