import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import * as businessActions from '../../store/business'
import { useDispatch, useSelector } from "react-redux";
import Review from './Review'

function BusinessPage() {
    const {businessId} = useParams();
    const dispatch = useDispatch();
    const business = useSelector(state => state.business.businesses)
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await dispatch(businessActions.getBusiness(businessId))
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
      setLoading(true)
    }
    fetchData();
  }, [businessId, business, dispatch]);

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
                </div>):(<div>
                    Loading...
                </div>)}
            </div>
        );

    }

}
export default BusinessPage;
