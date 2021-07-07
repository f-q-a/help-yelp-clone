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
  
  const myStyle = {
    boxSizing: "border-box",
    display: "inline",
    margin: "1em",


  }
  return (
    <div>
      <div>
        {props.review.user.username} {' '}
        {[...Array(props.review.rating)].map((el, idx) => <StarIcon key={idx}></StarIcon>)} { }
      </div>
      <div>
        {props.review.body} {' '}
        {sessionUser && sessionUser.id === props.review.user_id ?
        (<div style={myStyle}>
          <Link to={`/business/${props.review.business_id}/reviews/${props.review.user_id}/edit`} >Edit</Link>{' '}
        </div>) :
        (<div></div>)
      }
      </div>

    </div>

  );
}

export default Review
