// import { createChannelAction } from './channels'
// import * as ChannelActions from './channel'
const GET_BUSINESSES = "business/GET_BUSINESSES"
const GET_BUSINESS = "business/GET_BUSINESS"
const EDIT_BUSINESS = "BUSINESS/EDIT_BUSINESS"
const DELETE_BUSINESS = "BUSINESS/DELETE_BUSINESS"
const ADD_BUSINESS = 'BUSINESS/ADD_BUSINESS'

const setBusinesses = (businesses) => ({
    type: GET_BUSINESSES,
    businesses
})

const setBusiness = (business) => ({
    type: GET_BUSINESS,
    business
})

const addBusinessAction = (business) => ({
    type: ADD_BUSINESS,
    business
})

const editBusinessAction = (business) => ({
    type: EDIT_BUSINESS,
    business
})

const deleteBusinessAction = (business) => ({
    type: DELETE_BUSINESS,
    business
})


export const getBusinesses = () => async (dispatch) => {
    const response = await fetch(`/api/business/`)
    const data = await response.json();
    if (data.errors){
        return data
    } else {
        dispatch(setBusinesses(data))
        return data
    }
}


export const getBusiness = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/business/${businessId}`)
    const data = await response.json();
    if (data.errors){
        return data
    } else {
        dispatch(setBusiness(data))
        return data
    }
}

export const addBusiness = (business) => async (dispatch) => {
    const response = await fetch(`/api/business/new-business`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(business)
    }

    )
    const data = await response.json();
    if (data.errors){
        return data
    } else {
        dispatch(addBusinessAction(data))
        return data
    }
}

export const deleteBusiness = (business) => async (dispatch) => {
    const response = await fetch(`/api/business/${business.id}/delete`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(business)
    }

    )
    const data = await response.json();
    if (data.errors){
        return data
    } else {
        dispatch(deleteBusinessAction(data))
        return data
    }
}

export const editBusiness = (business) => async (dispatch) => {
    const response = await fetch(`/api/business/${business.id}/edit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(business)

    })
    const data = await response.json();
    console.log(data)
    if (data.errors){
        return data
    } else {
        dispatch(editBusinessAction(data))
        return data
    }
}
const initialState = {businesses: {}}
export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_BUSINESSES:
            newState = {...state}
            newState.businesses = action.businesses
            return {...state, businesses: newState.businesses}
        case GET_BUSINESS:
            newState = {...state};
            console.log(action.business)
            newState.businesses[action.business.id] = action.business;
            console.log(newState.businesses)
            return {...state, businesses: newState.businesses}
        case ADD_BUSINESS:
            return {...state}
        case EDIT_BUSINESS:
            newState = {...state};
            newState.businesses[action.business.id] = action.business;
            return {...state, businesses: newState.businesses}
        case DELETE_BUSINESS:
            newState = {...state};
            delete newState.businesses[action.business.id]
            return {...state, businesses: newState.businesses}
        default:
            return state;
    }
}
