from flask import Blueprint, jsonify, request
from app.models import db

search_routes = Blueprint('search', __name__)


@search_routes.route('/<search_term>')
def search(search_term):
    search_results = db.session.execute(
        f'SELECT * FROM services where services like \'%${search_term}%\''
    )
    return 
