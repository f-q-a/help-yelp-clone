// import { createChannelAction } from './channels'
// import * as ChannelActions from './channel'
const DELETE_REVIEW = "review/DELETE_REVIEW"
const EDIT_REVIEW = "review/EDIT_REVIEW"

const getReviewAction = (review) => ({
    type: EDIT_REVIEW,
    review
})

const editReviewAction = (review) => ({
    type: EDIT_REVIEW,
    review
})

const deleteReviewAction = (review) => ({
    type: DELETE_REVIEW,
    review
})

export const getReviews = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/review/${businessId}`)
    const data = await response.json();
    if (data.errors){
        return data
    } else {
        dispatch(editReviewAction(data))
        return data
    }
}

export const editReview = (businessId, userId, review) => async (dispatch) => {
    const response = await fetch(`/api/review/${businessId}/${userId}/edit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review)

    })
    const data = await response.json();
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

const initialState = {reviews: []}
export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case EDIT_REVIEW:
            newState = {...state};
            newState.reviews.push(action.review);
            return {...state, reviews: [...newState.reviews]}
        case DELETE_REVIEW:
            newState = {...state};
            delete newState.reviews[action.review.id];
            return {...state, reviews: {...newState.reviews}}
        default:
            return state;
    }
}
