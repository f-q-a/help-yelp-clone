import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import * as businessActions from '../../store/business'
import * as reviewActions from '../../store/review'
import { useDispatch, useSelector } from "react-redux";
import Review from './Review'
import { Rating } from '@material-ui/lab';
import { Link, Redirect, useHistory } from 'react-router-dom';
import EditReview from './EditReview';
import AddReview from "./AddReview";
import '../styles/reviews.css'

function BusinessPage() {
    const history = useHistory();
    const { businessId, userId } = useParams();
    const dispatch = useDispatch();
    const business = useSelector(state => {
        return state.business
    })
    const to_str = String(businessId)


    const reviews = useSelector(state => Object.values(state.review.reviews))
    const handleEditBusiness = (e) => {
        e.preventDefault();
        history.push({ pathname: `/business/${businessId}/${sessionUser.id}/edit-business`, state: { business: { ...business.businesses[to_str] } } });
    }
    const showAddReview = (e) => {
        e.preventDefault();
        history.push({ pathname: `/business/${businessId}/${sessionUser.id}/add-review`, state: { business: { ...business.businesses[to_str] } } });
    }
    const [users, setUsers] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const [blockAdd, setBlockAdd] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const reviewExists = sessionUser && reviews.some((el) => {
        return el.user_id === sessionUser.id;
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowForm(true);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        setBlockAdd(true);
        setShowAddForm(true);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        let toDelete = window.confirm('Are you sure you would like to delete this review?')
        if (toDelete) {
            dispatch(reviewActions.deleteReview(businessId, sessionUser.id, reviews[`${sessionUser.id}-${businessId}`]))
            history.push(`/business/${businessId}`)
        } else {

        }


    }
    useEffect(() => {
        console.log('IS session user home?', sessionUser)
        console.log('Is business home?', business[businessId])
        if (reviewExists) {
            setBlockAdd(true);
        } else {
            setBlockAdd(false);
        }
        return () => {
            dispatch(reviewActions.getReviews(businessId));
        }
    }, [sessionUser, business, reviewExists, businessId])

    useEffect(() => {
        dispatch(businessActions.getBusiness(businessId))
        dispatch(reviewActions.getReviews(businessId));
    }, [businessId, dispatch]);



    return (
        <div className='business__container'>
            {business.businesses[to_str] ? (
                <div>
                    <div className='business-container__business'>
                        <div>{business.businesses[to_str].business_name}</div>
                        <div>{business.businesses[to_str].category.name}</div>
                        Average Rating: <Rating name="half-rating-read" value={business.businesses[to_str]['avg_rating']} precision={0.1} readOnly />
                        <div>
                            {business.businesses[to_str].address}, {business.businesses[to_str].city}, {business.businesses[to_str].state}, {business.businesses[to_str].zipcode}
                        </div>
                        <div>{business.businesses[to_str].phone_number}</div>
                        <h3>Services Offered</h3>
                        <ul>
                            {Object.values(business.businesses[to_str].services).map((el) => {
                                return (<li key={el.id}>{el.desc} </li>);
                            })}
                        </ul>
                        <div>{sessionUser && (business.businesses[to_str].owner !== sessionUser.id ? (<div> </div>) : (<form onSubmit={handleEditBusiness}><div className='business-button__container'><button className='business-form__button' type='submit'>Edit Business</button></div></form>))} </div>
                    </div>
                    <div className='business__reviews-header'>Reviews</div>
                    <div className='reviews__container'>
                        {sessionUser && showAddForm && <div className='review__container'><AddReview businessId={business.businesses[to_str].id} userId={sessionUser.id} setShowAddForm={setShowAddForm} /></div>}
                        {Object.values(reviews).map((review, index) => {
                            if (sessionUser && sessionUser.id === review.user_id) {
                                if (showForm) {
                                    return (<div className='review__container'>
                                        <EditReview review={review} setShowForm={setShowForm} />
                                    </div>)
                                } else {
                                    return (<div className='review__container'>
                                        <div className='review-edit'>
                                            <Review key={index} review={review} setShowForm={setShowForm} />
                                            <form className='edit-form' onSubmit={handleSubmit}>
                                                <div className='edit-button__container'>
                                                    <button className='edit-form__button' type='submit'>Edit</button>
                                                    <button className='edit-form__button' onClick={handleDelete}>Delete Review</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>)
                                }

                            } else {
                                return (
                                    <div className='review__container'>
                                        <Review key={index} review={review} />
                                    </div>
                                )
                            }

                        })}
                    </div>

                    {sessionUser && (business.businesses[to_str].owner !== sessionUser.id) && (blockAdd === true ? (<div> </div>) : (
                        <div>
                            <div className='business-form__container'>
                                <form className='edit-form' onSubmit={handleAdd}>
                                    <div className='business-button__container'>
                                        <button className='business-form__button' type='submit'>Add New Review</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ))}



                </div>) : (<div>
                    Loading...
                </div>)}
        </div>
    );
}
export default BusinessPage;
