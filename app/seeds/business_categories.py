from app.models import db, BusinessCategory
from faker import Faker

faker = Faker()

# Adds a demo user, you can add other users here if you want


def seed_business_categories():

    categories = [
        BusinessCategory(name='Cleaning'),
        BusinessCategory(name='Electrical'),
        BusinessCategory(name='Plumbing'),
        BusinessCategory(name='Carpentry')
    ]

    for category in categories:
        db.session.add(category)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_business_categories():
    db.session.execute('TRUNCATE business_categories RESTART IDENTITY CASCADE;')
    db.session.commit()
