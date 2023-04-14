import { csrfFetch } from "./csrf";

const getReviewByUser = 'GETREVIEWSBYUSER'
const getCurrentSpotReview = 'GETCURRENTSPOTREVIEW'
const createReview = 'CREATEREVIEW'

const getReviewByTheUser = (user) => {
    return {
        type: getReviewByUser,
        payload: user,
    };
};

const getTheCurrentSpotReview = (payload) => {
    return {
        type: getCurrentSpotReview,
        payload: payload
    }
}

const createReviews = (payload, spotId) => {
    return {
        type: createReview,
        payload: payload,
        spotId: spotId
    }
}

export const createReviewThunk = (payload, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: payload.review, stars: parseInt(payload.stars) })
    })
    if (response.ok) {
        let res = await response.json()
        dispatch(createReviews(res))
        return res;
    }
}


export const getReviewByTheUserThunk = () => async (dispatch) => {
    const response = await fetch(`/api/reviews/current`)

    if (response.ok) {
        let res = await response.json()
        dispatch(getReviewByTheUser(res))
    }
}

export const getReviewForSpotThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        let res = await response.json()
        dispatch(getTheCurrentSpotReview(res))
    }
}

const initialState = { spot: {}, user: {} }

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case getReviewByUser: {
            newState = Object.assign({}, state.user)
            if (action.payload.Reviews) {
                action.payload.Reviews.forEach(review => {
                    newState[review.id] = review
                })
            } else {
                newState = { ...action.payload }
            }
            return newState
        } case getCurrentSpotReview: {
            newState = Object.assign({}, state.spot)
            if (action.payload.Reviews) {
                action.payload.Reviews.forEach(review => {
                    newState[review.id] = review
                })
            } else {
                newState = { ...action.payload }
            }
            return newState
        } case createReview: {
            newState = Object.assign({}, state)
            newState[action.payload.id]= action.payload
            return newState;
        }

        default:
            return state;
    }
}

export default reviewReducer
