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
    const reviews = useSelector(state => state.review)
    const [users, setUsers] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const [blockAdd, setBlockAdd] = useState(false);

    const conditionalRenderForReview = () => {
        console.log('IS session user home?', sessionUser)
        console.log('Is business home?', business[businessId])
        if (sessionUser) {
            for (const el in reviews) {
                console.log('Are we keying into reviews correctly?', el)
                if (Number(reviews[el]['user_id']) === Number(sessionUser.id)) {
                    console.log('here we are', el['user_id'])
                    setBlockAdd(true);
                    break;
                }
            }
        }
    }

    useEffect(() => {
        async function fetchData() {
            await dispatch(businessActions.getBusiness(businessId))
            await dispatch(reviewActions.getReviews(businessId))
        }

        fetchData();

    }, [businessId, dispatch]);
    conditionalRenderForReview();



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
                            {Object.values(business.businesses[to_str].reviews).map((review, index) => {
                                return (<Review key={index} review={review} />);
                            })}
                        </div>

                        {blockAdd === true ? (<div> </div>) : (<div><Link to={`/business/${businessId}/${sessionUser.id}/new-review`}>Add New Review</Link>{' '}</div>)}



                    </div>) : (<div>
                        Loading...
                    </div>)}
            </div>
        );
}
export default BusinessPage;
