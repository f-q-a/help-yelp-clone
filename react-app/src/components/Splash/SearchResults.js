import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinesses } from '../../store/business';
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';

function SearchResults(props) {
    const { business } = props;
    Object.values(business).forEach(el => {
    })
    return (
        <div className='search__search-result'>
            <div className='search__business-title'><Link to={`/business/${Number(business.id)}`}>{String(business['business_name'])}</Link></div>
            <div><Rating size='small' name="half-rating-read" defaultValue={business['avg_rating']} precision={0.1} readOnly /></div>
            <div className='search__business-address'>{business.address},  {business.city}, {business.state}, {business.zipcode} </div>
            <div className='search__business-phone'>{business.phone_number}</div>
        </div>
    );

}

export default SearchResults;
