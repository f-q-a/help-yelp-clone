from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Review
from sqlalchemy import and_, desc


review_routes = Blueprint('review', __name__)



@review_routes.route('/<int:b_id>')
def review(b_id):
    reviews = Review.query.filter(Review.business_id == int(b_id)).order_by(Review.created_at.desc()).all()
    # TODO: I don't know man
    return {f'{review.user_id}-{review.business_id}': review.to_dict() for review in reviews}

@review_routes.route('/<int:b_id>/<int:u_id>/add', methods=['POST'])
def add_review(b_id,u_id):
    res = request.get_json()
    review = Review(business_id=b_id,
                    user_id=u_id,
                    body = res['body'],
                    rating=res['rating'])
    db.session.add(review)
    db.session.commit()
    return review.to_dict()


@review_routes.route('/<int:b_id>/<int:u_id>/edit', methods=['POST'])
def edit_review(b_id,u_id):
    res = request.get_json()


    review = Review.query.filter(and_(Review.business_id == int(b_id), Review.user_id == int(u_id))).first()

    review.body = res['review']
    review.rating = res['newRating']
    review.updated_at = db.func.now()
    db.session.commit()
    return review.to_dict()


@review_routes.route('/<int:b_id>/<int:u_id>/delete', methods=['DELETE'])
def delete_review(b_id, u_id):
    review = Review.query.filter_by(business_id=b_id, user_id=u_id).first()
    temp = review.to_dict()
    db.session.delete(review)
    db.session.commit()
    return temp
