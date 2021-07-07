import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinesses } from '../../store/business'
function SearchResults(props) {
    const { business } = props
    const [filter, setFilter] = useState('');

    return (

        <div>
            <div>
            <label htmlFor="search">Search</label>
            <input
              name="search"
              type="text"
              placeholder="search"
              value={search}
              onChange={handleChange}
            />
            </div>
            <div>
                <div> {business.business_name} </div>
                <div> {business.address},  {business.city}, {business.state}, {business.zipcode} </div>
                <div> {business.phone_number} </div>
            </div>
        </div>
    );

}

export default SearchResults;
