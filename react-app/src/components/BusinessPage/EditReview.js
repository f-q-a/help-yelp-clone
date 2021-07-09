import React from "react";
import { useEffect } from 'react'
import { useParams } from "react-router";
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import * as businessActions from '../../store/business'
import * as reviewActions from '../../store/review'

function EditReview(props) {
    const {businessId, userId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const business = useSelector(state => state.business.businesses)
    let currReview = '';

    const reviews = business[businessId]['reviews']

    reviews.forEach(el => {

        if (el['user_id'] === Number(userId)){
            currReview = {...el};
        }
    })

    const [newRating, setNewRating] = useState(Number(currReview.rating));
    const [loading, setLoading] = useState(false);
    const [newBody, setNewBody] = useState(String(currReview.body))


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
        dispatch(reviewActions.deleteReview(businessId, userId, currReview))
        history.push(`/business/${businessId}`)

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(reviewActions.editReview(businessId, userId, newBody, newRating))
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
                <label>
                    Rating
                    <select value={newRating} onChange={e => setNewRating(e.target.value)}>
                       <option value={1}>1</option>
                       <option value={2}>2</option>
                       <option value={3}>3</option>
                       <option value={4}>4</option>
                       <option value={5}>5</option>
                    </select>
                </label>

                <label>
                    Update Review
                    <textarea
                        defaultValue={newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                        required
                    />
                </label>

            </div>
            <button type="submit">Submit Changes</button>
            <button onClick={handleDelete}>Delete Review</button>
        </form>

        );
    }

}

export default EditReview
