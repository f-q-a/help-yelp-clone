// import { createChannelAction } from './channels'
// import * as ChannelActions from './channel'
const GET_BUSINESSES = "business/GET_BUSINESS"

const setBusinesses = (businesses) => ({
    type: GET_BUSINESSES,
    businesses
})

export const getBusinesses = () => async (dispatch) => {
    const response = await fetch(`/api/businesses/`)
    const data = await response.json();
    if (data.errors){
        return data
    } else {
        dispatch(setBusinesses(data.businesses))
        return {}
    }
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_BUSINESSES:
            return {...state, ...action.businesses}
        default:
            return state;
    }
}
