from flask import Blueprint, jsonify, request
from app.models import db

search_routes = Blueprint('search', __name__)


@search_routes.route('/<search_term>')
def search(search_term):
    search_results = db.session.execute(
        f'SELECT * from businesses as A LEFT JOIN business_services as B ON a.id = b.business_id JOIN services ON services.id = B.service_id;'
    )
    return
