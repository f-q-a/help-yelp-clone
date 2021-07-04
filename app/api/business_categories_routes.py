from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, BusinessCategory

business_category_routes = Blueprint('business_categories', __name__)


@business_category_routes.route('/')
def business_categories():
    categories = BusinessCategory.query.all()
    return [category.to_dict() for category in categories]


@business_category_routes.route('/<int:id>')
def business_category(id):
    business_category = BusinessCategory.query.get(id)
    return business_category.to_dict()
