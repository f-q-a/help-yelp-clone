import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import * as businessActions from '../../store/business'
import * as reviewActions from '../../store/review'
import { useDispatch, useSelector } from "react-redux";
import Review from './Review'
import { Link, useHistory } from 'react-router-dom'
function BusinessPage() {
    const {businessId} = useParams();
    const dispatch = useDispatch();
    const business = useSelector(state => state.business.businesses)
    const [users, setUsers] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const [loading, setLoading] = useState(false);
    const [loadAdd, setLoadAdd] = useState(false);
    const reviews = {...business[businessId]}
    const userReviews = {...reviews.reviews}

    // userReviews.forEach((el)=>{
    //     if(el['user_id'] === sessionUser.id){
    //         setLoadAdd(true);
    //     }
    // })

    console.log(userReviews);
  useEffect(() => {
    async function fetchData() {
      await dispatch(businessActions.getBusiness(businessId))
      await dispatch(reviewActions.getReviews(businessId))
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
      setLoading(true)
    }
    fetchData();
  }, [businessId,business, dispatch]);

    if(!loading){
        return (<div>
            Loading...
        </div>)
    }else {
        return (
            <div>
                {business? (
                <div>
                    {business[businessId].business_name}
                    <div>
                       {business[businessId].address}, {business[businessId].city}, {business[businessId].state}, {business[businessId].zipcode}
                    </div>
                    <div>Reviews</div>
                    <div>
                        {business[businessId]['reviews'].map((review, index) =>{
                            return(<Review key={index} review={review} users={users} />);

                        })}
                    </div>
                    <div>
                        <Link to={`/business/${businessId}/new-review`}>Add New Review</Link>{' '}
                    </div>

                </div>):(<div>
                    Loading...
                </div>)}
            </div>
        );

    }

}
export default BusinessPage;
