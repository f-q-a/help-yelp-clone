// import { createChannelAction } from './channels'
// import * as ChannelActions from './channel'
const DELETE_REVIEW = "review/DELETE_REVIEW"
const EDIT_REVIEW = "review/EDIT_REVIEW"
const GET_REVIEWS = "review/GET_REVIEWS"
const ADD_REVIEW = "review/ADD_REVIEW"

const addReviewAction = (review) => ({
    type: ADD_REVIEW,
    review
})

const getReviewsAction = (reviews, businessId) => ({
    type: GET_REVIEWS,
    reviews,
    businessId
})

const editReviewAction = (review) => ({
    type: EDIT_REVIEW,
    review
})

const deleteReviewAction = (review) => ({
    type: DELETE_REVIEW,
    review
})

export const addReview = (businessId, userId, body, rating) => async (dispatch) => {
    const response = await fetch(`/api/review/${businessId}/${userId}/add`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({businessId, userId, body, rating})

    })
    const data = await response.json();
    if (data.errors){
        return data
    } else {
        dispatch(addReviewAction(data))
        return data
    }
}

// export const getReviews = () => async (dispatch) => {
//     const response = await fetch(`/api/review/${businessId}`)
//     const data = await response.json();
//     if (data.errors){
//         return data
//     } else {
//         dispatch(getReviewsAction(data))
//         return data
//     }
// }

export const getReviews = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/review/${businessId}`)
    const data = await response.json();
    if (data.errors){
        return data
    } else {
        dispatch(getReviewsAction(data, businessId))
        return data
    }
}

export const editReview = (businessId, userId, review, newRating) => async (dispatch) => {
    const response = await fetch(`/api/review/${businessId}/${userId}/edit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({review, newRating})

    })
    const data = await response.json();
    console.log(data)
    if (data.errors){
        return data
    } else {
        dispatch(editReviewAction(data))
        return data
    }
}

export const deleteReview = (businessId, userId, review) => async (dispatch) => {
    const response = await fetch(`/api/review/${businessId}/${userId}/delete`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review)
    }

    )
    const data = await response.json();
    if (data.errors){
        return data
    } else {
        dispatch(deleteReviewAction(data))
        return data
    }
}

const initialState = { reviews:{}}
export default function reducer(state = initialState, action) {
    let newState;
    let temp = {};
    let nextTemp = {};
    switch (action.type) {
        case GET_REVIEWS:
            newState = {...state};
            const reviews = {}
            console.log(action.reviews)

            action.reviews.forEach((el) => {
                temp = Object.assign({}, el);
                temp[temp.user_id] = Object.assign({}, temp)
                reviews[action.businessId] = {...temp}
                console.log(reviews)
            })
            temp = {}
            nextTemp = {}
            newState.reviews = {...reviews}
            return {...state, reviews: newState.reviews}
        case ADD_REVIEW:
        case EDIT_REVIEW:
            newState = {...state};
            newState.reviews[action.review.business_id][action.review.user_id] = action.review;
            return {...state, reviews: newState.reviews}
        case DELETE_REVIEW:
            newState = {...state};
            delete newState.reviews[action.review.business_id][action.review.user_id]
            return {...state, reviews: newState.reviews}
        default:
            return state;
    }
}
