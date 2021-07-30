# Help (Yelp Clone)

## What is Help?
Help is an app for reviewing and finding businesses/contractors/service providers for services such as commercial cleaning, construction, plumbing, carpentry, and the like.

## Frontend
### React
* Help is a react application; all of the frontend views are rendered using React.
### Redux
* The information presented to the user on the frontend is what is retrieved by Redux through thunks that make API calls to the backend server.

## Backend
### Flask
* Flask made implementing the backend routes very straightforward, another reason it was chosen was so that Flask-SQLAlchemy could be used as the ORM for the app.

### Flask-SQLAlchemy
* Flask-SQLALchemy drastically facilitated the process of retrieving data from the database and sending it to the frontend, it is very easy to understand and use.

### PostgreSQL
* PostgreSQL was chosen to be the database used for this project because it is very simple to use and especially to interact with through Flask-SQLAlchemy.

### Faker
* The Faker library was used to create some of the seed data for users.


## Reflections

In the future, I would like to flesh the app out a bit more to allow users to customize their profiles and also to use the google maps API to provide a visual representation of where all of the businesses that are returned by the search results are located. As it stands right now, the app's main features are full CRUD functionality on reviews and businesses.

## Author
### [Felipe Araujo](https://github.com/f-q-a)
