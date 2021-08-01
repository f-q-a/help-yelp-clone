import React from "react";
import { useEffect } from 'react'
import { useParams } from "react-router";
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import * as businessActions from '../../store/business'
import * as reviewActions from '../../store/review'
import '../styles/form.css'
function AddReview() {
    const dispatch = useDispatch();
    const { businessId, userId } = useParams();
    const history = useHistory();
    const [body, setBody] = useState("");
    const sessionUser = useSelector(state => state.session.user);
    const [rating, setRating] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(reviewActions.addReview(businessId, Number(userId), body, rating))
        history.push(`/business/${businessId}`)

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label>
                        Rating
                    </label>
                    <select value={rating} onChange={e => setRating(e.target.value)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                <div>
                <label>
                    Create Review
                </label>
                <textarea
                    defaultValue={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
                </div>
            </div>
            <button type="submit">Submit Review</button>
        </form>

    );
}

export default AddReview
