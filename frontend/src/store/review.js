const getReviewByUser = 'GETREVIEWSBYUSER'
const getCurrentSpotReview = 'GETCURRENTSPOTREVIEW'

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
                console.log('getReviewByUser in if')
                action.payload.Reviews.forEach(review => {
                    newState[review.id] = review
                })
            } else {
                console.log('getReviewByUser in else')
                newState = { ...action.payload }
            }
            return newState
        } case getCurrentSpotReview: {
            newState = Object.assign({}, state.spot)
            if (action.payload.Reviews) {
                console.log('getCurrentSpotReview in if')
                action.payload.Reviews.forEach(review => {
                    newState[review.id] = review
                })
            } else {
                console.log('getCurrentSpotReview in else')
                newState = { ...action.payload }
            }
            return newState
        }
        default:
            return state;
    }
}

export default reviewReducer
