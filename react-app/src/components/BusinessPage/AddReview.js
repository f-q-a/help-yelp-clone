import React from "react";
import { useEffect } from 'react'
import { useParams } from "react-router";
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import * as businessActions from '../../store/business'
import * as reviewActions from '../../store/review'

function AddReview() {
    const {businessId, userId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const business = useSelector(state => state.business.businesses)
    let currReview = '';

    const reviews = business[businessId]['reviews']

    // reviews.forEach(el => {

    //     if (el['user_id'] === Number(userId)){
    //         currReview = {...el};
    //     }
    // })

    const [loading, setLoading] = useState(false);
    const [newBody, setNewBody] = useState('')


    useEffect(() => {
        async function fetchData() {
            await dispatch(businessActions.getBusiness(businessId))
            setLoading(true)
        }
        fetchData();
    }, [businessId, business, dispatch]);
    const sessionUser = useSelector(state => state.session.user);
    const handleDelete = (e) => {
        e.preventDefault();
        currReview.body = newBody;
        dispatch(reviewActions.deleteReview(businessId, userId, currReview))
        history.push(`/business/${businessId}`)

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(reviewActions.editReview(businessId, userId))
        history.push(`/business/${businessId}`)

    }
    if(!business){
        return (
            <div>
                Loading...
            </div>
        );
    }else{
        return (
            <form onSubmit={handleSubmit}>
            <div>
                <label>Update Review</label>
                    <textarea
                        defaultValue={currReview.body}
                        onChange={(e) => setNewBody(e.target.value)}
                        required
                    />
            </div>
            <button type="submit">Submit Changes</button>
            <button onClick={handleDelete}>Delete Review</button>
        </form>

        );
    }

}

export default AddReview
