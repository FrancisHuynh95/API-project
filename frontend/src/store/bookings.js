import { csrfFetch } from "./csrf";
const GET_BOOKING = 'GETBOOKING'
const DELETE_BOOKING = 'DELETEBOOKING'
const USER_BOOKINGS = 'USERBOOKINGS'
const CREATE_BOOKING = 'CREATEBOOKING'

const getBooking = (booking) => {
    return {
        type: GET_BOOKING,
        booking
    }
}

const deleteBooking = (booking) => {
    return {
        type: DELETE_BOOKING,
        booking
    }
}

const userBookings = (bookings) => {
    return {
        type: USER_BOOKINGS,
        bookings
    }
}

const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

export const getBookingThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if(res.ok){
        const response = await res.json()
        dispatch(getBooking(response))
        return response
    }
}

// export const createBookingThunk = (spotId, booking) => async (dispatch) => {
//     try {
//         const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
//             method: "POST",
//             headers: {'Content-Type': "application/json"},
//             body: JSON.stringify(booking)
//         })
//         if(res.ok){
//             const response = await res.json()
//             dispatch(createBooking(response))
//             return response
//         }
//     } catch(e){
//         const errors = await e.json()
//         return errors
//     }
// }

export const createBookingThunk = (spotId, booking) => async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(booking)
        })
        if(res.ok){
            const response = await res.json()
            dispatch(createBooking(response))
            return response
        }

}

export const updateBookingThunk = (bookingId, booking) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(booking)
    })
    if(res.ok){
        const response = await res.json()
        dispatch(getUserBookingsThunk())
        return response
    }
}

export const removeBookingThunk = (bookingId) => async(dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })
    if(res.ok){
        await dispatch(deleteBooking(bookingId))
        dispatch(getUserBookingsThunk())
    }
}

export const getUserBookingsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/current`)
    if(res.ok){
        const response = await res.json()
        await dispatch(userBookings(response))
        return response
    }
}


const initalState = {bookings: {}, user: {}}
const bookingReducer = (state = initalState, action) => {
    let newState
    switch(action.type){
        case GET_BOOKING:{
            newState = {...state, bookings: {}, user: {...state.user}}
            newState.bookings = action.booking.Bookings
            return newState
        }
        case USER_BOOKINGS:{
            newState = {...state, user: {...state.user}}
            if(action.bookings.message !== "There are no bookings"){
                action.bookings.Bookings.forEach(booking =>
                    newState.user[booking.id] = booking
                    )
                }
            return newState;
        } case CREATE_BOOKING: {
            newState = {...state, bookings: {...state.bookings}, user: {...state.user}}
            newState.user[action.booking.id] = action.booking
            return newState;
        }
        case DELETE_BOOKING: {
            newState = {...state, bookings: {...state.bookings}, user: {...state.user}}
            delete newState.user[action.booking]
            return newState
        }
            default:
            return state;
    }
}

export default bookingReducer
