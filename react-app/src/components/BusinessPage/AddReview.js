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
    const [validationErrors, setValidationErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const [rating, setRating] = useState(1);

    const validate = () => {
        let temp = []

        if (body.length >= 255) temp.push('Your review exceeds the maximum character length (255). Please shorten your review.');
        if(body.trim().length <=0 ) temp.push('Review cannot be empty!');
        return temp;
    }

    useEffect(() => {
        async function fetchData() {
            await dispatch(businessActions.getBusiness(props.businessId))
        }
        fetchData();
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if(errors.length > 0) return setValidationErrors(errors)
        await dispatch(reviewActions.addReview(props.businessId, Number(props.userId), body, rating))
        props.setShowAddForm(false)
        props.setBlockAdd(true);
        props.setReload(!props.reload);

    }

    return (
        <div className='add-review__container'>
            <div className='error__container'>
                    {validationErrors.map((el, idx) => {
                        return (<div className='error' key={idx}>{el}</div>)
                    })}
                </div>
            <form onSubmit={handleSubmit}>
                <div className='review-input__container'>
                    <div className='form__input'>
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
                    <div className='form__input'>
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
                <div className='edit-button__container'>
                    <button className='edit-form__button' type="submit">Submit Review</button>
                </div>
            </form>
        </div>
    );
}

export default AddReview
