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
function AddReview(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [body, setBody] = useState("");
    const sessionUser = useSelector(state => state.session.user);
    const [rating, setRating] = useState(1);

    useEffect(() => {
        async function fetchData() {
            await dispatch(businessActions.getBusiness(props.businessId))
        }
        fetchData();
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(reviewActions.addReview(props.businessId, Number(props.userId), body, rating))
        props.setShowAddForm(false)
        history.push(`/business/${props.businessId}`)

    }

    return (
        <div>
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
        </div>
    );
}

export default AddReview
