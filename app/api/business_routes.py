from app.models.service import Service
from app.models.business_service import BusinessService
from app.models.category import BusinessCategory
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Business, Review, BusinessCategory, BusinessService, Service, db
from collections import defaultdict

business_routes = Blueprint('business', __name__)


@business_routes.route('/')
def businesses():
    businesses = Business.query.all()
    b_dict = [business.to_dict() for business in businesses]
    for dict in b_dict:
        dict['services'] = [service.to_dict() for service in db.session.query(Service).join(BusinessService).filter(
            dict['id'] == BusinessService.business_id, BusinessService.service_id == Service.id)]
        temp = db.session.query(BusinessCategory).filter(
            BusinessCategory.id == dict['category_id']).first()
        t_dict = temp.to_dict()
        print('is this working?', t_dict)
        dict['category'] = t_dict['name']
        reviews = Review.query.filter(Review.business_id == dict['id']).all()
        print('Are we querying this correctly?', reviews)
        r_dict = [review.to_dict() for review in reviews]
        rating = [review['rating'] for review in r_dict]
        if (len(rating) >= 1):
            avg_rating = (sum(rating)/len(rating))
            dict['avg_rating'] = avg_rating
        else:
            avg_rating = (sum(rating)/1)
            dict['avg_rating'] = round(avg_rating, 2)
    print('These are all the businesses------>', b_dict)
    return jsonify(b_dict)


@business_routes.route('/<int:id>')
def business(id):
    # business = Business.query.get(id)
    # business = db.session.query(Business, BusinessCategory, BusinessService, Service).join(BusinessCategory, Business.category_id == BusinessCategory.id) \
    #                               .join(BusinessService, Business.id == BusinessService.business_id)\
    #                               .join(Service, Service.id == BusinessService.service_id)\
    #                               .filter(Business.id == id)\
    #                               .all()
    business = Business.query.get(id)
    print('Is this even working?', business)
    b_dict = business.to_dict()
    b_dict['services'] = [service.to_dict() for service in db.session.query(Service).join(BusinessService).filter(
        b_dict['id'] == BusinessService.business_id, BusinessService.service_id == Service.id)]
    temp = db.session.query(BusinessCategory).filter(
        BusinessCategory.id == b_dict['category_id']).first()
    reviews = Review.query.filter(Review.business_id == id).all()
    print('Are we querying this correctly?', reviews)
    r_dict = [review.to_dict() for review in reviews]

    b_dict['category'] = temp.to_dict()

    print('This is Business', r_dict)
    rating = [review['rating'] for review in r_dict]
    if (len(rating) >= 1):
        avg_rating = (sum(rating)/len(rating))
        b_dict['avg_rating'] = avg_rating
    else:
        avg_rating = (sum(rating)/1)
        b_dict['avg_rating'] = avg_rating

    # for x in business:

    #     b_dict = x[0].to_dict()
    #     b_dict['reviews'] = [review.to_dict() for review in x[0].reviews]
    #     print(x[0].reviews)
    #     b_dict['category'] = x[1]
    #     if 'services' in b_dict:
    #         b_dict['services'].append(x[3])
    #     else:
    #         b_dict['services'] = []
    #         b_dict['services'].append(x[3])

    # print('Am I working?', b_dict)
    return b_dict


@business_routes.route('/new-business', methods=['POST'])
def add_business():
    res = request.get_json()
    business = Business(
        business_name=res['business_name'],
        address=res['address'],
        city=res['city'],
        state=res['state'],
        zipcode=res['zipcode'],
        phone_number=res['phone_number'],
        category_id=res['category_id'],
        business_img="",
        owner=res['owner']
    )
    db.session.add(business)
    db.session.commit()
    return business.to_dict()


@business_routes.route('/<int:b_id>/edit', methods=['POST'])
def edit_business(b_id):
    res = request.get_json()
    print('Whats going on here?', res)
    business = Business.query.get(b_id)
    service = BusinessService.query.filter(BusinessService.business_id == b_id)
    temp = db.session.query(BusinessCategory).filter(
        BusinessCategory.id == business.category_id).first()
    temp.to_dict()
    business.business_name = res['business_name']
    business.address = res['address']
    business.city = res['city']
    business.state = res['state']
    business.zipcode = res['zipcode']
    business.phone_number = res['phone_number']
    business.category_id = res['category_id']
    business.updated_at = db.func.now()
    db.session.commit()
    b_dict = business.to_dict()
    b_dict['category'] = {'name': temp.name}
    return b_dict


@business_routes.route('/<int:b_id>/delete', methods=['DELETE'])
def delete_business(b_id):
    business = Business.query.get(b_id)
    temp = business.to_dict()
    db.session.delete(business)
    db.session.commit()
    return temp
