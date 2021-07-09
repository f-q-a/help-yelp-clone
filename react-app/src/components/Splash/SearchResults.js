import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinesses } from '../../store/business'
function SearchResults(props) {
    const { business } = props
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');

    return (

        <div>
                <div> {business.business_name} </div>
                <div> {business.address},  {business.city}, {business.state}, {business.zipcode} </div>
                <div> {business.phone_number} </div>
            </div>
    );

}

export default SearchResults;
