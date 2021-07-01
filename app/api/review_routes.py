from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import
from app.models import db, Review

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def reviews():
    reviews = Review.query.all()
    return [review.to_dict() for review in reviews]


@review_routes.route('/', methods=['POST'])
def reviews():
    res = request.get_json()
    review = Review(user_id=res.user_id,
                    business_id=res.business_id,
                    body=res.body,
                    rating=res.rating,
                    created_at=res.created_at,
                    updated_at=res.updated_at)
    db.session.add(review)
    db.session.commit()
    return [review.to_dict() for review in reviews]


@review_routes.route('/<int:id>')
def review(id):
    review = Review.query.get(id)
    return review.to_dict()


@review_routes.route('/<int:id>/edit', methods=['POST'])
def edit_review(id):
    res = request.get_json()
    review = Review.query.get(id)
    review.body = res['body']
    review.updated_at = db.func.now()
    db.session.add(review)
    db.session.commit()
    return review.to_dict()


@review_routes.route('/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = db.session.query(Review).get(id)
    temp = review.to_dict()
    db.session.delete(review)
    db.session.commit()
    return temp
