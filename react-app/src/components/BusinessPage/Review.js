import React from "react";
import { useEffect } from 'react'
import {useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
function Review(props) {
  console.log(props.users)
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    async function fetchData() {
    }
    fetchData();
  });
    return (
        <div>
            User Name: {props.users[props.review.user_id -1].username}

            Rating: {props.review.rating}

            Body: {props.review.body}

            {sessionUser && sessionUser.id === props.review.user_id ?
            (<div>
                 <Link to={`/${props.review.business_id}/reviews/${props.review.id}/edit`} className="button">Edit</Link>{' '}
            </div>) :
            (<div></div>)
            }
        </div>

    );
}

export default Review
