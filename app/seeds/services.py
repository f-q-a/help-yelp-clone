from werkzeug.security import generate_password_hash
from app.models import db, Service
from faker import Faker

faker = Faker()

# Adds a demo user, you can add other users here if you want


def seed_services():

    services = [
        Service(desc="Strip and Wax"),
        Service(desc="Vacuuming"),
        Service(desc="Scrub and Wax"),
        Service(desc="Carpet Extraction"),
        Service(desc="Concrete Polishing")
    ]

    for service in services:
        db.session.add(service)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_services():
    db.session.execute('TRUNCATE services RESTART IDENTITY CASCADE;')
    db.session.commit()
