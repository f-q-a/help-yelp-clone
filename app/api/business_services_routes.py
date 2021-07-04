from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Business

business_service_routes = Blueprint('business_services', __name__)


@business_service_routes.route('/')
def businesses():
    businesses = Business.query.all()
    return [business.to_dict() for business in businesses]


@business_service_routes.route('/<int:id>')
def business(id):
    business = Business.query.get(id)
    return business.to_dict()
