import React from "react";
import { useEffect } from 'react'
import { useParams } from "react-router";
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import * as businessActions from '../../store/business'


function AddBusiness() {
    const { businessId, userId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const businesses = useSelector(state => state.business.businesses)
    const business = businesses[`${businessId}`]
    const [categoryId, setCategoryId] = useState(0);
    const [address, setAddress] = useState('');
    const [businessState, setBusinessState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [city, setCity] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [services, setServices] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const businessUpdate = { 'id': businessId, 'business_name': businessName, 'address': address, 'city': city, 'state': businessState, 'zipcode': zipcode, 'category_id': categoryId, 'phone_number': phoneNumber, 'business_img': '', 'services': services }
        await dispatch(businessActions.editBusiness(businessUpdate))
        history.push(`/business/${businessId}`)

    }

    useEffect(() => {
        async function fetchData() {
            await dispatch(businessActions.getBusiness(businessId))
            setCategoryId(business.category_id)
            setAddress(business.address)
            setBusinessName(business.name)
            setPhoneNumber(business.phone_number)
            setCity(business.city)
            setBusinessState(business.state)
            setZipcode(business.zipcode)
            setServices(business.services)
        }
        fetchData();
    }, [businessId, business, dispatch]);

    if (!business) {
        return (
            <div>
                Loading...
            </div>
        );
    } return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2>New Business</h2>
                <div>
                    <label>
                        Business Name
                        <input
                            name="business_name"
                            type="text"
                            placeholder={business['business_name']}
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            required
                        />

                    </label>
                </div>
                <div>
                    <label>
                        Address
                        <input
                            name="address"
                            type="text"
                            placeholder={business.address}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        City
                        <input
                            name="city"
                            type="text"
                            placeholder={business.city}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        State
                        <input
                            name="state"
                            type="text"
                            placeholder={business.state}
                            value={businessState}
                            onChange={(e) => setBusinessState(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Zipcode
                        <input
                            name="zipcode"
                            type="text"
                            placeholder={business.zipcode}
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Phone Number
                        <input
                            name="phone_number"
                            type="text"
                            placeholder={business.phone_number}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Select Business Category
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                            <option value={1}>Cleaning</option>
                            <option value={2}>Electrical</option>
                            <option value={3}>Plumbing</option>
                            <option value={4}>Carpentry</option>
                        </select>
                    </label>
                </div>
                {/* <label>
                        List services offered, seperated by commas without spacing:
                        <textarea
                        defaultValue={Object.values(business.services).map((el) => el.desc)}
                        onChange={(e) => setServices(e.target.value)}
                        required
                    />
                    </label> */}
            </div>
            <button type="submit">Submit Review</button>
        </form>

    );
}

export default AddReview
