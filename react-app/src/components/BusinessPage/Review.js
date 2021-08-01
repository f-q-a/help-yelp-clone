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
  const reviews = useSelector(state => state.session.reviews);
  const sessionUser = useSelector(state => state.session.user);
  const [users, setUsers] = useState([]);
  console.log('reviews ---------->', reviews);
  return (
<td>
      <td className='review-content'>
        {props.review.user.username} {' '}
        {[...Array(props.review.rating)].map((el, idx) => <StarIcon key={idx}></StarIcon>)} { }
      </td>
      <tr className='review-content'>
        <td>
          <tr>{props.review.body} {' '}</tr>
        </td>
      </tr>
    </td>


  );
}

export default Review
