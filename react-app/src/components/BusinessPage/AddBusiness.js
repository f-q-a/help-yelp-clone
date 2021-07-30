import React from "react";
import { useEffect } from 'react'
import { useParams } from "react-router";
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import * as businessActions from '../../store/business'
import '../styles/form.css'


function AddBusiness() {

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const businesses = useSelector(state => state.business.businesses)
    const [categoryId, setCategoryId] = useState(1);
    const [address, setAddress] = useState('');
    const [businessState, setBusinessState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [city, setCity] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [services, setServices] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const businessUpdate = { 'business_name': businessName, 'address': address, 'city': city, 'state': businessState, 'zipcode': zipcode, 'owner': sessionUser.id, 'category_id': categoryId, 'phone_number': phoneNumber, 'business_img': '' }
        await dispatch(businessActions.addBusiness(businessUpdate))
        history.push(`/`)

    }

    useEffect(() => {
        async function fetchData() {
            await dispatch(businessActions.getBusinesses())
        }
        fetchData();
    }, [dispatch]);

    return (

            <div className='form__container'>
                <form onSubmit={handleSubmit}>
                    <div className='input__container'>
                        <h2>New Business</h2>
                        <div className='form__input'>
                            <label>
                                Business Name
                            </label>
                            <input
                                    name="business_name"
                                    type="text"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    required
                                />
                        </div>
                        <div className='form__input'>
                            <label>
                                Address
                            </label>
                            <input
                                    name="address"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                        </div>
                        <div className='form__input'>
                            <label>
                                City
                            </label>
                            <input
                                    name="city"
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                        </div>
                        <div className='form__input'>
                            <label>
                                State
                            </label>
                            <input
                                    name="state"
                                    type="text"
                                    value={businessState}
                                    onChange={(e) => setBusinessState(e.target.value)}
                                    required
                                />
                        </div>
                        <div className='form__input'>
                            <label>
                                Zipcode
                            </label>
                            <input
                                    name="zipcode"
                                    type="text"
                                    value={zipcode}
                                    onChange={(e) => setZipcode(e.target.value)}
                                    required
                                />
                        </div>
                        <div className='form__input'>
                            <label>
                                Phone Number
                            </label>
                            <input
                                    name="phone_number"
                                    type="text"
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
                        <button className='business__button' type="submit">Add Business</button>
                    </div>
                    </div>


                </form>
            </div>
    );
}

export default AddBusiness
