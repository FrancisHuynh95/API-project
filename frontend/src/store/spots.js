import { csrfFetch } from "./csrf"
import { restoreUser } from "./session"

const GETALLSPOTS = 'GETALL'
const CREATESPOTS = 'CREATESPOTS'
const GETONESPOT = 'GETONESPOT'
const ADDIMAGE = 'ADDIMAGE'

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

const getOneSpot = (spot) => {
    return {
        type: GETONESPOT,
        payload: spot
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

export const createSpotThunk = (payload, imageInfo) => async (dispatch) => {
    console.log('IMAGE INFOOOOOOOOOOOO', imageInfo)
    const response = await csrfFetch('/api/spots', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const spot = await response.json()
        for (let i = 0; i < imageInfo.length; i++) {
           await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(imageInfo[i])
            })
        }
    }
}

export const getOneSpotThunk = (spotId) => async (dispatch) => {
    let response = await fetch(`/api/spots/${spotId}`)

    if (response.ok) {
        let newRes = await response.json()

        dispatch(getOneSpot(newRes))
    }
}

const initialState = { allSpots: {}, singleSpot: {} }

const spotReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GETALLSPOTS: {
            newState = Object.assign({}, state.allSpots, state.singleSpot)
            action.payload.Spots.forEach(spot => {
                newState[spot.id] = spot
            })
            return newState

        } case CREATESPOTS: {
            newState = Object.assign({}, state.singleSpot)
            console.log(action.payload)
            // if (!state[action.Spot?.id]) {
            //     newState = { ...state, }
            // }
            return newState;

        } case GETONESPOT: {
            newState = Object.assign({}, state.singleSpot)
            newState[action.payload.id] = action.payload
            return newState
        } default:
            return state;
    }
}

export default spotReducer
