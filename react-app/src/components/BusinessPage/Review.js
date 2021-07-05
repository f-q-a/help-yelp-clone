import React from "react";
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import StarIcon from '@material-ui/icons/Star';

function Review(props) {
  console.log(props.users)
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    async function fetchData() {
    }
    fetchData();
  });
  const myStyle = {
    boxSizing: "border-box",
    display: "inline",
    margin: "1em",


  }
  return (
    <div>
      <div>
        {props.users[props.review.user_id - 1].username} {' '}
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
