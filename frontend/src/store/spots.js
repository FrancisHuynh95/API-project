
const GETALLSPOTS = 'GETALL'
const CREATESPOTS = 'CREATESPOTS'

const getSpot = (spots) => {
    return {
        type: GETALLSPOTS,
        payload: spots
    }
}

const createSpot = (spots) => {
    return {
        type: CREATESPOTS,
        payload: spots
    }
}

export const getSpotThunk = () => async (dispatch) => {
    let response = await fetch('/api/spots')

    if (response.ok) {
        let newRes = await response.json()
        await dispatch(getSpot(newRes))
        return newRes;
    }
}

export const createSpotThink = (payload) => async(dispatch) => {
    const response = await fetch('/api/spots' , {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const spot = await response.json()
        dispatch(createSpot(spot))
    }
}

const initialState = { spots: {allSpots: null}}
const spotReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GETALLSPOTS: {
            newState = Object.assign({}, state.spots.allSpots)
            action.payload.Spots.forEach(spot => {
                newState[spot.id] = spot
            })
            return newState
        } case CREATESPOTS: {
            if(!state[action.Spot.id]){
                newState = { ... state,}
            }
        }
        default:
            return state;
    }
}

export default spotReducer
