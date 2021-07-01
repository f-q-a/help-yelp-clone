from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Business

business_routes = Blueprint('businesses', __name__)


@business_routes.route('/')
def businesses():
    businesses = Business.query.all()
    return [business.to_dict() for business in businesses]


@business_routes.route('/<int:id>')
def business(id):
    business = Business.query.get(id)
    return business.to_dict()
