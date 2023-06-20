import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserBookingsThunk } from "../../store/bookings"
import { useHistory } from "react-router-dom/cjs/react-router-dom"


function UserBookings() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const bookings = useSelector(state => state.bookings)
    const bookingsArray = Object.values(bookings)
    console.log(bookingsArray)

    useEffect(() => {
        dispatch(getUserBookingsThunk(user.id))
    }, [dispatch])

    function handleEdit(){
        console.log('edit booking')
    }
    function handleDelete(){
        console.log('delete booking modal')
    }
    if(!bookings) return <p>You don't have any bookings</p>
    return (
        <>
            <h1>User Bookings</h1>
            {bookingsArray.map(booking =>
                <div className="bookingSpotCard" title={`${booking.Spot.name}`}>
                    <img src={`${booking.Spot.previewImage}`}></img>
                    <p>${`${booking.Spot.price}`}</p>
                    <button onClick={() => handleEdit()}>Edit Booking</button>
                    <button onClick={() => handleDelete()}>Delete Booking</button>
                </div>
                )}
        </>
    )
}

export default UserBookings
