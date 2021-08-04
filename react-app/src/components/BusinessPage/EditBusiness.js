import React from "react";
import { useEffect } from 'react'
import { useParams } from "react-router";
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from "react-redux";
import * as businessActions from '../../store/business'
import '../styles/form.css'

function EditBusiness() {
    const { businessId, userId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const loc = useLocation();
    const businesses = useSelector(state => state.business.businesses)
    const business = loc.state.business;
    const [categoryId, setCategoryId] = useState(0);
    const [address, setAddress] = useState('');
    const [businessState, setBusinessState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [city, setCity] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [services, setServices] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const validate = () =>{
        let temp = [];
        if(phoneNumber.length !== 10){
            temp.push('Phone numbers must contain exactly 10 digits. Please enter a valid phone number.')
        }

        if(!(address.trim().length > 0)){
            temp.push('Business address cannot be empty! Please enter an address for your business.')
        }

        if(!(businessState.trim().length > 0)){
            temp.push('Business state cannot be empty! Please enter the state your business is located in.')
        }

        if(!(city.trim().length > 0)){
            temp.push('City cannot be empty! Please enter the city your business is located in.')
        }

        if(!(businessName.trim().length > 0)){
            temp.push('Business name cannot be empty! Please enter a name for your business.')
        }

        if(zipcode.length !== 5){
            temp.push('Zipcodes must contain exactly 5 digits. Please enter a valid zipcode.')
        }

        return temp;

    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(businessActions.deleteBusiness(business))
        history.push(`/`)

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (errors.length > 0) return setValidationErrors(errors);
        const businessUpdate = { 'id': businessId, 'business_name': businessName, 'address': address, 'city': city, 'state': businessState, 'zipcode': zipcode, 'category_id': categoryId, 'phone_number': phoneNumber, 'business_img': '', 'services': services }
        await dispatch(businessActions.editBusiness(businessUpdate))
        history.push(`/business/${businessId}`)

    }

    useEffect(() => {
        async function fetchData() {
            await dispatch(businessActions.getBusiness(businessId))

        }
        fetchData();
        setCategoryId(business.category_id)
        setAddress(business.address)
        setBusinessName(business.business_name)
        setPhoneNumber(business.phone_number)
        setCity(business.city)
        setBusinessState(business.state)
        setZipcode(business.zipcode)
        setServices(business.services)
    }, [businessId, businesses, dispatch]);

    if (!business) {
        return (
            <div>
                Loading...
            </div>
        );
    } else {
        return (
            <div className='form__container business-edit__form'>
                <div className='business-error__container'>
                    {validationErrors.map((el, idx) => {
                        return (<div className='error' key={idx}>{el}</div>)
                    })}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='input__container'>
                        <h2>Edit Business Details</h2>
                        <div className='form__input'>
                            <label>
                                Business Name
                            </label>
                            <input
                                name="business_name"
                                type="text"
                                placeholder={business['business_name']}
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form__input'>
                            <label>
                                Edit Address
                            </label>
                            <input
                                name="address"
                                type="text"
                                placeholder={business.address}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form__input'>
                            <label>
                                Edit City
                            </label>
                            <input
                                name="city"
                                type="text"
                                placeholder={business.city}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form__input'>
                            <label>
                                Edit State
                            </label>
                            <input
                                name="state"
                                type="text"
                                placeholder={business.state}
                                value={businessState}
                                onChange={(e) => setBusinessState(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form__input'>
                            <label>
                                Edit Zipcode
                            </label>
                            <input
                                name="zipcode"
                                type="text"
                                placeholder={business.zipcode}
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form__input'>
                            <label>
                                Edit Phone Number (e.g. 1234567899)
                            </label>
                            <input
                                name="phone_number"
                                type="text"
                                placeholder={business.phone_number}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form__input'>
                            <label>
                                Select Business Category
                            </label>
                            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                <option value={1}>Cleaning</option>
                                <option value={2}>Electrical</option>
                                <option value={3}>Plumbing</option>
                                <option value={4}>Carpentry</option>
                            </select>
                        </div>
                        {/* <label>
                        List services offered, seperated by commas without spacing:
                        <textarea
                        defaultValue={Object.values(business.services).map((el) => el.desc)}
                        onChange={(e) => setServices(e.target.value)}
                        required
                    />
                    </label> */}
                        <div className='form__input button__container'>
                            <button className='form__button' type="submit">Submit Changes</button>
                        </div>
                    </div>
                </form >
            </div>

        );
    }

}

export default EditBusiness
