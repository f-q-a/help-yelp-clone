from app.models import db, Review
from faker import Faker

faker = Faker()

# Adds a demo user, you can add other users here if you want


def seed_reviews():

    reviews = [
        Review(user_id=1, business_id=2, body=faker.paragraph(nb_sentences=5, variable_nb_sentences=False), rating=5),
        Review(user_id=1, business_id=3, body=faker.paragraph(nb_sentences=5, variable_nb_sentences=False), rating=4),
        Review(user_id=2, business_id=1, body=faker.paragraph(nb_sentences=5, variable_nb_sentences=False), rating=1),
        Review(user_id=2, business_id=4, body=faker.paragraph(nb_sentences=5, variable_nb_sentences=False), rating=2),
        Review(user_id=2, business_id=5, body=faker.paragraph(nb_sentences=5, variable_nb_sentences=False), rating=3),
        Review(user_id=3, business_id=2, body=faker.paragraph(nb_sentences=5, variable_nb_sentences=False), rating=5),
        Review(user_id=3, business_id=1, body=faker.paragraph(nb_sentences=5, variable_nb_sentences=False), rating=2),
        Review(user_id=3, business_id=3, body=faker.paragraph(nb_sentences=5, variable_nb_sentences=False), rating=4),
        Review(user_id=4, business_id=2, body=faker.paragraph(nb_sentences=5, variable_nb_sentences=False), rating=2),
        Review(user_id=4, business_id=5, body=faker.paragraph(nb_sentences=5, variable_nb_sentences=False), rating=3),
        Review(user_id=5, business_id=5, body=faker.paragraph(nb_sentences=5, variable_nb_sentences=False), rating=3)
    ]

    for review in reviews:
        db.session.add(review)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
