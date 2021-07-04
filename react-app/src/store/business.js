// import { createChannelAction } from './channels'
// import * as ChannelActions from './channel'
const GET_BUSINESSES = "business/GET_BUSINESSES"

const setBusinesses = (businesses) => ({
    type: GET_BUSINESSES,
    businesses
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
const initialState = {businesses: {}}
export default function reducer(state = {...initialState}, action) {
    switch (action.type) {
        case GET_BUSINESSES:
            return {...state, businesses: action.businesses}
        default:
            return state;
    }
}
