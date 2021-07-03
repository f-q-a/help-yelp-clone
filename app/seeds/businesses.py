from app.models import db, Business
from faker import Faker

faker = Faker()

# Adds a demo user, you can add other users here if you want


def seed_businesses():

    businesses = [
        Business(business_name='Boston Cleaning Company', address='245 First St', city='Cambridge', state='MA ',
                 zipcode='02142', category_id=1, business_img=''),
        Business(business_name='Cleanzen Cleaning Services', address='30 Newbury St', city='Boston', state='MA',
                 zipcode='02116', category_id=1, business_img=''),
        Business(business_name='Boston Cleaning Company', address='245 First St', city='Cambridge', state='MA ',
                 zipcode='02142', category_id=1, business_img=''),
        Business(business_name='Cleanzen Cleaning Services', address='30 Newbury St', city='Boston', state='MA',
                 zipcode='02116', category_id=1, business_img=''),
        Business(business_name='Speedy\'s Cleaning Services', address='396 Washington St Suite 258', city='Wellesley Hills', state='MA',
                 zipcode='02481', category_id=1, business_img='')
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
