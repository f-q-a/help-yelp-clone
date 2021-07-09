import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinesses } from '../../store/business';
import { Link } from 'react-router-dom';
function SearchResults(props) {
    const { business } = props
    console.log(business)

    return (

        <div>
            <Link to={`/business/${Number(business.id)}`}>{String(business['business_name'])}</Link>
            <div> {business.address},  {business.city}, {business.state}, {business.zipcode} </div>
            <div> {business.phone_number} </div>
        </div>
    );

}

export default SearchResults;
