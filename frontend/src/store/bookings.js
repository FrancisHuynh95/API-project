import { csrfFetch } from "./csrf";


const initalState = {user: {}, spot: {}}
const bookingReducer = (state = initalState, action) => {
    switch(action.type){
        default:
            return state;
    }
}

export default bookingReducer
