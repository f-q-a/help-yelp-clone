from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Review

review_routes = Blueprint('review', __name__)


@review_routes.route('/')
def reviews():
    reviews = Review.query.all()
    return [review.to_dict() for review in reviews]


@review_routes.route('/', methods=['POST'])
def add_review():
    res = request.get_json()
    review = Review(user_id=res.user_id,
                    business_id=res.business_id,
                    body=res.body,
                    rating=res.rating,
                    created_at=res.created_at,
                    updated_at=res.updated_at)
    db.session.add(review)
    db.session.commit()
    return review.to_dict()


@review_routes.route('/<int:id>')
def review(id):
    review = Review.query.get(id)
    return review.to_dict()


@review_routes.route('/<int:b_id>/<int:u_id>/edit', methods=['POST'])
def edit_review(b_id,u_id):
    res = request.get_json()
    review = Review.query.filter_by(business_id=b_id, user_id=u_id).first()
    review.body = res['body']
    review.updated_at = db.func.now()
    db.session.add(review)
    db.session.commit()
    return review.to_dict()


@review_routes.route('/<int:b_id>/<int:u_id>/delete', methods=['DELETE'])
def delete_review(b_id, u_id):
    review = Review.query.filter_by(business_id=b_id, user_id=u_id).first()
    temp = review.to_dict()
    db.session.delete(review)
    db.session.commit()
    return temp
