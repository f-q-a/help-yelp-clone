from app.models import db, BusinessService
from faker import Faker

faker = Faker()

# Adds a demo user, you can add other users here if you want


def seed_business_services():

    business_services = [
        BusinessService(business_id=1, service_id=1),
        BusinessService(business_id=1, service_id=2),
        BusinessService(business_id=1, service_id=4),
        BusinessService(business_id=2, service_id=1),
        BusinessService(business_id=2, service_id=2),
        BusinessService(business_id=3, service_id=1),
        BusinessService(business_id=4, service_id=3)
    ]

    for i in business_services:
        db.session.add(i)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_business_services():
    db.session.execute('TRUNCATE business_services RESTART IDENTITY CASCADE;')
    db.session.commit()
