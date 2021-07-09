// import { createChannelAction } from './channels'
// import * as ChannelActions from './channel'
const GET_BUSINESSES = "business/GET_BUSINESSES"

const GET_BUSINESS = "business/GET_BUSINESS"

const setBusinesses = (businesses) => ({
    type: GET_BUSINESSES,
    businesses
})

const setBusiness = (business) => ({
    type: GET_BUSINESS,
    business
})

export const getBusinesses = () => async (dispatch) => {
    const response = await fetch(`/api/business/`)
    const data = await response.json();
    if (data.errors){
        return data
    } else {
        dispatch(setBusinesses(data.businesses))
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
        default:
            return state;
    }
}
