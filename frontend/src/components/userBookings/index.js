import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserBookingsThunk } from "../../store/bookings"
import { useHistory } from "react-router-dom/cjs/react-router-dom"
import BookingCard from "../bookingCard"
import './manageBooking.css'


function UserBookings() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const bookings = useSelector(state => state.bookings.user)
    const bookingsArray = Object.values(bookings)

    useEffect(() => {
        dispatch(getUserBookingsThunk(user.id))
    }, [dispatch])

    if(Object.values(bookings).length === 0) return <p>You don't have any bookings</p>
    return (
        <>
            <h1>User Bookings</h1>
            <div className="bookingsContainer">
            {bookingsArray.toReversed().map(booking =>
            < BookingCard booking={booking}/>
                )}
                </div>
        </>
    )
}

export default UserBookings
