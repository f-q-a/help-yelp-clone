import React from "react";
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as reviewActions from '../../store/review'
import StarIcon from '@material-ui/icons/Star';
import { Rating } from '@material-ui/lab';
import '../styles/reviews.css'

function Review(props) {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.review.reviews);
  const sessionUser = useSelector(state => state.session.user);
  const [users, setUsers] = useState([]);
  const dateArr = props.review.created_at.split(' ')
  const formattedDate = dateArr.slice(1,5).join(' ')

  return (
<div className='review-content__container'>
      <div className='review-content'>
        <div className='username-rating'>
          <div className='review-content__field review-content__username'><div>{props.review.user.username}</div></div>
          <div className='review-content__field review-content__rating'><Rating name="half-rating-read" value={props.review.rating} precision={0.1} readOnly /> </div>
        </div>
        <div className='review-content__field review-content__date'>{formattedDate}</div>
      </div>
      <div className='review-content'>
        <div>
          <div>{props.review.body} {' '}</div>
        </div>
      </div>
    </div>


  );
}

export default Review
