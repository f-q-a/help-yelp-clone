from app.models.service import Service
from app.models.business_service import BusinessService
from app.models.category import BusinessCategory
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Business, BusinessCategory, BusinessService, Service, db
from collections import defaultdict

business_routes = Blueprint('business', __name__)


@business_routes.route('/')
def businesses():
    businesses = Business.query.all()
    b_dict = [business.to_dict() for business in businesses]
    for dict in b_dict:
        dict['services'] = [service.to_dict() for service in db.session.query(Service).join(BusinessService).filter(dict['id'] == BusinessService.business_id, BusinessService.service_id == Service.id)]
        temp = db.session.query(BusinessCategory).filter(BusinessCategory.id == dict['category_id']).first()
        dict['category'] = temp.to_dict()
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
    print('This is Business', b_dict)

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
    return  b_dict
