import React from "react";
import { useEffect } from 'react'
import { useParams } from "react-router";
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import '../styles/reviews.css'
import * as businessActions from '../../store/business'
import * as reviewActions from '../../store/review'
import '../styles/form.css'

function EditReview(props) {
    const { review, setShowForm } = props;
    const businessId = review.business_id;
    console.log(props.review);
    const history = useHistory();
    const dispatch = useDispatch();

    const business = useSelector(state => state.business.businesses)
    const reviews = useSelector(state => state.review.reviews)
    const targetReview = reviews[`${review.user_id}-${review.business_id}`]

    const [newRating, setNewRating] = useState(targetReview.rating);
    const [loading, setLoading] = useState(false);
    const [newBody, setNewBody] = useState(targetReview.body)


    useEffect(() => {
        async function fetchData() {
            await dispatch(businessActions.getBusiness(review.business_id))
            setLoading(true)
        }
        fetchData();
    }, [businessId, business, dispatch]);
    const sessionUser = useSelector(state => state.session.user);
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(reviewActions.deleteReview(review.business_id, review.user_id, targetReview))
        history.push(`/business/${businessId}`)

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(reviewActions.editReview(review.business_id, review.user_id, newBody, newRating))
        setShowForm(false);
        history.push(`/business/${businessId}`)

    }
    if (!business) {
        return (
            <div>
                Loading...
            </div>
        );
    } else {
        return (
            <div className='form__container'>
                <form onSubmit={handleSubmit}>
                    <div className='input__container'>
                        <div className='form__input'>
                            <label>
                                Rating
                            </label>
                            <select value={newRating} onChange={e => setNewRating(e.target.value)}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>
                        <div className='form__input'>
                            <label>
                                Update Review
                            </label>
                            <textarea
                                defaultValue={newBody}
                                onChange={(e) => setNewBody(e.target.value)}
                                required
                            />
                        </div>
                        <div className='button__container'>
                            <button className='form__button' type="submit">Save</button>
                            <button className='form__button' onClick={setShowForm(false)}>Cancel</button>
                            <button className='form__button' onClick={handleDelete}>Delete Review</button>
                        </div>
                    </div>

                </form>
            </div>

        );
    }

}

export default EditReview
