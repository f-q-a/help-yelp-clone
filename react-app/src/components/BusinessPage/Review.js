import React from "react";
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as reviewActions from '../../store/review'
import StarIcon from '@material-ui/icons/Star';

function Review(props) {
  console.log('HELLO IM A PROGRAMMER', props.review);
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.review.reviews);
  const sessionUser = useSelector(state => state.session.user);
  const [users, setUsers] = useState([]);
  console.log('reviews ---------->', reviews);
  return (
<div className='review-content__container'>
      <div className='review-content'>
        <div className='review-content__field'>{props.review.user.username} {' '}</div>
        <div className='review-content__field'>{[...Array(props.review.rating)].map((el, idx) => <StarIcon key={idx}></StarIcon>)} { }</div>
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
