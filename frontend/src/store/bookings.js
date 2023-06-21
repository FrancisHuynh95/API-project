import { csrfFetch } from "./csrf";
const GET_BOOKING = 'GETBOOKING'
const DELETE_BOOKING = 'DELETEBOOKING'
const USER_BOOKINGS = 'USERBOOKINGS'

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

export const getBookingThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if(res.ok){
        const response = await res.json()
        dispatch(getBooking(response))
        return response
    }
}

export const createBookingThunk = (spotId, booking) => async (dispatch) => {
    const res = csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(booking)
    })
    if(res.ok){
        const response = await res.json()
        dispatch(getBooking(response))
        return response
    }
}

export const editBookingThunk = (booking, ) => async (dispatch) => {
    const res = csrfFetch(`/api/bookings/${booking.id}`, {
        method: "PUT",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(booking)
    })
    if(res.ok){
        const response = await res.json()
        dispatch(getBooking(response))
        return response
    }
}

export const removeBookingThunk = (bookingId) => async(dispatch) => {
    const res = csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })
    if(res.ok){
        const response = await dispatch(deleteBooking(bookingId))
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


const initalState = {}
const bookingReducer = (state = initalState, action) => {
    let newState
    switch(action.type){
        case GET_BOOKING:{
            newState = {}
            action.booking.Bookings.forEach(booking =>
                newState[booking.id] = booking
            )
            console.log('newState',newState)
            return newState;
        }
        case USER_BOOKINGS:{
            newState = {}
            action.bookings.Bookings.forEach(booking =>
                newState[booking.id] = booking
            )
            return newState;
        }
        case DELETE_BOOKING: {
            newState = {...state}
            const res = newState.filter(booking => booking.id !== action.booking)
            return res;
        }
            default:
            return state;
    }
}

export default bookingReducer
