from app.models import db, Business
from faker import Faker

faker = Faker()

# Adds a demo user, you can add other users here if you want


def seed_businesses():

    businesses = [
        Business(business_name='Boston Cleaning Company', address='245 First St', city='Cambridge', state='MA',
                 zipcode='02142', category_id=1, phone_number='(508) 620-2887', business_img='', owner=1),
        Business(business_name='Cleanzen Cleaning Services', address='30 Newbury St', city='Boston', state='MA',
                 zipcode='02116', category_id=1, phone_number='(508) 620-2887', business_img='', owner=2),
        Business(business_name='Speedy\'s Cleaning Services', address='396 Washington St Suite 258', city='Wellesley Hills', state='MA',
                 zipcode='02481', category_id=1, phone_number='(508) 620-2887', business_img='', owner=2),
        Business(business_name='IL Cleaning services', address='178 Irving St #1', city='Framingham', state='MA',
                 zipcode='01702', category_id=1, phone_number='(704) 777-1254', business_img='', owner=1),
        Business(business_name='Let\'s Go Clean',address='178 Arlington St #2F', city='Framingham', state='MA',
                 zipcode='01702', category_id=1, phone_number='(508) 250-4005', business_img='', owner=3)
    ]

    for business in businesses:
        db.session.add(business)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_businesses():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
