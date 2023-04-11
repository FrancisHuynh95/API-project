const getReviewByUser='GETREVIEWSBYUSER'
const getCurrentSpotReview='GETCURRENTSPOTREVIEW'

const getReviewByTheUser = (user) => {
    return {
      type: 'GETREVIEWSBYUSER',
      payload: user,
    };
  };

  const getTheCurrentSpotReview = (payload) => {
    return {
        type: getCurrentSpotReview,
        payload: payload
    }
  }


  export const getReviewByTheUserThunk = (current) => async (dispatch) => {
    const response = await fetch(`/api/reviews/current`)

    if(response.ok){
        let res = await response.json()
        dispatch(getReviewByTheUser(res))
    }
  }

  export const getReviewForSpotThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if(response.ok){
        let res=await response.json()
        console.log('getReviewForSpotThunk Res',res)
        dispatch(getTheCurrentSpotReview(res))
    }
  }

  const initialState = {spot: {}, user: {}}

  const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case getReviewByUser: {
        newState = Object.assign({}, state.user)
        action.payload.Reviews.forEach(review => {
            newState[review.id] = review
        })
        return newState
        } case getCurrentSpotReview: {
            newState = Object.assign({}, state.spot)
            action.payload.Reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        }
        default:
            return state;
        }
}

export default reviewReducer
