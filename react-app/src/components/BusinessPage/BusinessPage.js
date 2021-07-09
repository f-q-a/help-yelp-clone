import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import * as businessActions from '../../store/business'
import * as reviewActions from '../../store/review'
import { useDispatch, useSelector } from "react-redux";
import Review from './Review'
import { Link, useHistory } from 'react-router-dom'
function BusinessPage() {
    const { businessId, userId } = useParams();
    const dispatch = useDispatch();
    const business = useSelector(state => {
        console.log(state);
        console.log(businessId);
        console.log(state['business']);
        return state.business
    })
    const to_str = String(businessId)
    const reviews = useSelector(state => Object.values(state.review.reviews))
    const [users, setUsers] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const [blockAdd, setBlockAdd] = useState(false);
    const reviewExists = sessionUser && reviews.some((el) => {
        return el.user_id === sessionUser.id;
    })
    useEffect(() => {
        console.log('IS session user home?', sessionUser)
        console.log('Is business home?', business[businessId])
        if(reviewExists) {
            setBlockAdd(true);
        }else{
            setBlockAdd(false);
        }
        return () => {
            dispatch(reviewActions.getReviews(businessId));
        }
    },[sessionUser, reviewExists, businessId])

    useEffect(() => {
        dispatch(businessActions.getBusiness(businessId))
        dispatch(reviewActions.getReviews(businessId));

    }, [businessId, dispatch]);




    return (
        <div>
            {business.businesses[to_str] ? (
                <div>
                    {business.businesses[to_str].business_name}
                    <div>
                        {business.businesses[to_str].address}, {business.businesses[to_str].city}, {business.businesses[to_str].state}, {business.businesses[to_str].zipcode}
                    </div>
                    <div>Reviews</div>
                    <div>
                        {Object.values(reviews).map((review, index) => {
                            console.log(review)
                            return (<Review key={index} review={review} />);
                        })}
                    </div>

                    {sessionUser && (blockAdd === true ? (<div> </div>) : (<div><Link to={`/business/${businessId}/${sessionUser.id}/new-review`}>Add New Review</Link>{' '}</div>))}



                </div>) : (<div>
                    Loading...
                </div>)}
        </div>
    );
}
export default BusinessPage;
