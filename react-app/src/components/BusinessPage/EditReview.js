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
    const history = useHistory();
    const dispatch = useDispatch();

    const business = useSelector(state => state.business.businesses)
    const reviews = useSelector(state => state.review.reviews)
    const targetReview = reviews[`${review.user_id}-${review.business_id}`]

    const [newRating, setNewRating] = useState(props.review.rating);
    const [loading, setLoading] = useState(false);
    const [newBody, setNewBody] = useState(props.review.body)

    const validate = () => {
        const validationErrors = [];

        if (newBody.length >= 255) validationErrors.push('Your review exceeds the maximum character length (255). Please shorten your review.');

        return validationErrors;
    }

    const errors = validate();
    


    useEffect(() => {
        async function fetchData() {
            await dispatch(businessActions.getBusiness(review.business_id))
            setLoading(true)
        }
        fetchData();
    }, [businessId, business, dispatch]);
    const sessionUser = useSelector(state => state.session.user);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const temp = [];
        if (errors.length) {
            temp.push('Review exceeds max character length of 255. Please shorten your review.');
            setNewBody(props.review.rating);
        }
        await dispatch(reviewActions.editReview(props.review.business_id, props.review.user_id, newBody, newRating))
        setShowForm(false);
        history.push(`/business/${businessId}`)

    }

    const handleCancel = (e) => {
        e.preventDefault();
        setShowForm(false);
    }
    if (!business) {
        return (
            <div>
                Loading...
            </div>
        );
    } else {
        return (
            <div className='edit-form__container'>
                <div>
                    {errors.map((el, idx) => {
                        return (<div key={idx}>{el}</div>)
                    })}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='edit-input__container'>
                        <div className='edit-form__input'>
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
                        <div className='edit-form__input'>
                            <label>
                                Update Review
                            </label>
                            <textarea
                                defaultValue={newBody}
                                onChange={(e) => setNewBody(e.target.value)}
                                required
                            />
                        </div>
                        <div className='edit-button__container'>
                            <button className='edit-form__button' type="submit">Save</button>
                            <button className='edit-form__button' onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>

                </form>
            </div>

        );
    }

}

export default EditReview
