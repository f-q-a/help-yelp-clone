from app.seeds.businesses import seed_businesses, undo_businesses
from app.seeds.services import seed_services, undo_services
from app.seeds.business_services import seed_business_services, undo_business_services
from app.seeds.business_categories import seed_business_categories, undo_business_categories
from app.seeds.reviews import seed_reviews, undo_reviews
from flask.cli import AppGroup
from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_services()
    seed_business_categories()
    seed_businesses()
    seed_business_services()
    seed_reviews()

    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_services()
    undo_business_categories()
    undo_businesses()
    undo_business_services()
    undo_reviews()
    # Add other undo functions here
