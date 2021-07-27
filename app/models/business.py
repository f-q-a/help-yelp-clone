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
    zipcode = db.Column(db.String(255), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        'business_categories.id'), nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    business_img = db.Column(db.String(255), nullable=False)
    owner = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), nullable=False)
    owner = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reviews = db.relationship('Review', cascade='all,delete', backref="business")
    business_services = db.relationship('BusinessService', cascade='all,delete', backref="business")

    def to_dict(self):
        return {
            "id": self.id,
            "business_name": self.business_name,
            "address": self.address,
            # "latitude": self.latitude,
            # "longitude": self.longitude,
            "city": self.city,
            'owner': self.owner,
            "state": self.state,
            "zipcode": self.zipcode,
            "category_id": self.category_id,
            "phone_number": self.phone_number,
            "business_img": self.business_img,
            "services": {business_service.service.id: business_service.service.to_dict() for business_service in self.business_services},
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
