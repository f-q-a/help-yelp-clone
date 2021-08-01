import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import * as businessActions from '../../store/business'
import * as reviewActions from '../../store/review'
import { useDispatch, useSelector } from "react-redux";
import Review from './Review'
import { Rating } from '@material-ui/lab';
import { Link, useHistory } from 'react-router-dom';
import EditReview from './EditReview';
import '../styles/reviews.css'

function BusinessPage() {
    const { businessId, userId } = useParams();
    const dispatch = useDispatch();
    const business = useSelector(state => {
        return state.business
    })
    const to_str = String(businessId)


    const reviews = useSelector(state => Object.values(state.review.reviews))
    const [users, setUsers] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const [blockAdd, setBlockAdd] = useState(false);
    const [showForm, setShowForm] = useState(false)
    const reviewExists = sessionUser && reviews.some((el) => {
        return el.user_id === sessionUser.id;
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowForm(true);
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
                    <div>{sessionUser && (business.businesses[to_str].owner !== sessionUser.id ? (<div> </div>) : (<div><Link to={`/business/${businessId}/${sessionUser.id}/edit-business`}>Edit Business</Link>{' '}</div>))} </div>
                    <div className=''>Reviews</div>
                    <table className='reviews__container'>
                        {Object.values(reviews).map((review, index) => {
                            if (sessionUser && sessionUser.id === review.user_id) {
                                if (showForm) {
                                    return (<tr className='review__container'>
                                        <EditReview review={review} setShowForm={setShowForm} />
                                    </tr>)
                                }
                                return (<tr className='review__container'>
                                    <td>
                                        <Review key={index} review={review} setShowForm={setShowForm} />
                                        <form className='edit-form' onSubmit={handleSubmit}>
                                            <div className='edit-button__container'>
                                                <button type='submit' className='edit-form__button' >Edit</button>
                                            </div>
                                        </form>
                                    </td>
                                </tr>)
                            } else {
                                return (
                                    <tr className='review__container'>
                                        <Review key={index} review={review} />
                                    </tr>
                                )
                            }

                        })}
                    </table>

                    {sessionUser && (business.businesses[to_str].owner !== sessionUser.id) && (blockAdd === true ? (<div> </div>) : (<div><Link to={`/business/${businessId}/${sessionUser.id}/new-review`}>Add New Review</Link>{' '}</div>))}



                </div>) : (<div>
                    Loading...
                </div>)}
        </div>
    );
}
export default BusinessPage;
