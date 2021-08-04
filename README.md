# Help (Yelp Clone)
![Help Yelp Clone](https://user-images.githubusercontent.com/30086536/128221694-8bd0d688-9359-42f8-a744-4ab369814faa.png)


## What is Help?
[Help](https://help-yelp.herokuapp.com/) is an app for reviewing and finding businesses/contractors/service providers for services such as commercial cleaning, construction, plumbing, carpentry, and the like. Users are able to create and view reviews for businesses, and they can also add their own businesses to the app.

## Frontend
### React
* Help is a react application; all of the frontend views are rendered using React.
### Redux
* The information presented to the user on the frontend is what is retrieved by Redux through thunks that make API calls to the backend server.

### Tailwind CSS
* Tailwind CSS was only used to style a few elements, at least 90% of the site was styled using regular CSS.

### Material-UI
* The star ratings and the search icon come from the Material-UI/icons package. 

## Backend
### Flask
* Flask made implementing the backend routes very straightforward, another reason it was chosen was so that Flask-SQLAlchemy could be used as the ORM for the app.

### Flask-SQLAlchemy
* Flask-SQLALchemy drastically facilitated the process of retrieving data from the database and sending it to the frontend, it is very easy to understand and use.

### PostgreSQL
* PostgreSQL was chosen to be the database used for this project because it is very simple to use and especially to interact with through Flask-SQLAlchemy.

### Faker
* The Faker library was used to create some of the seed data for users, as well as the bodys for the reviews.


## Reflections

In the future, I would like to flesh the app out a bit more to allow users to customize their profiles and also to use the google maps API to provide a visual representation of where all of the businesses that are returned by the search results are located. As it stands right now, the app's main features are full CRUD functionality on reviews and businesses.
