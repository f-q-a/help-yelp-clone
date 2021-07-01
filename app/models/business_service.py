from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
from sqlalchemy_utils import PhoneNumber


class BusinessService(db.Model):
    __tablename__ = 'business_services'
    __table_args__ = (db.PrimaryKeyConstraint('business_id', 'service_id'), )
    
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))

    def to_dict(self):
        return {
            "business_id": self.business_id,
            "service_id": self.service_id
        }
