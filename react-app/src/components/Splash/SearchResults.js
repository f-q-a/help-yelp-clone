import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinesses } from '../../store/business';
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';

function SearchResults(props) {
    const { business } = props
    console.log(business)
    Object.values(business).forEach(el => {
        console.log(el)
    })
    return (
        <div>
            <div><Link to={`/business/${Number(business.id)}`}>{String(business['business_name'])}</Link> <Rating size='small' name="half-rating-read" defaultValue={business['avg_rating']} precision={0.1} readOnly /></div>
            <div>{business.address},  {business.city}, {business.state}, {business.zipcode} </div>
            <div>{business.phone_number}</div>
        </div>
    );

}

export default SearchResults;
