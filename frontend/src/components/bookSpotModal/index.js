import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { createBookingThunk, getBookingThunk } from "../../store/bookings"

function BookSpot({ spot }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const bookings = useSelector(state => state.bookings)
    const bookingsArray = Object.values(bookings)
    const [errors, setErrors] = useState({})
    const errorObj = {}
    const user = useSelector(state => state.session.user)


            function bookingsStuff(){
                if(bookingsArray.length > 0){
                    const bookings = bookingsArray.forEach(booking => {
                    const bookingStart = new Date(booking.startDate)
                    const bookingEnd = new Date(booking.endDate)
                    const newStart = new Date(startDate)
                    const newEnd = new Date(endDate)

                    const bookingStartTime = bookingStart.getTime()
                    const bookingEndTime = bookingEnd.getTime()
                    const newStartTime = newStart.getTime()
                    const newEndTime = newEnd.getTime()

                    if (
                        (newStartTime < bookingStartTime && newEndTime > bookingStartTime) ||
                        (newStartTime > bookingStartTime && newStartTime < bookingEndTime) ||
                        (bookingStartTime > newStartTime && newEndTime > bookingEndTime)
                        ) return false;
                        else {
                            return true
                        }
                    })
                } else {
                    const newStart = new Date(startDate)
                    const newEnd = new Date(endDate)

                    const newStartTime = newStart.getTime()
                    const newEndTime = newEnd.getTime()

                    if(newEndTime <= newStartTime){
                        return false;
                    } else {
                        return true
                    }
                }
            }


    // const today = Date.now()
    const today = new Date().toISOString().split("T")[0];

    async function handleSubmit(e) {
        e.preventDefault()
        if (bookingsStuff === false) {
            errorObj.dates = "This date range is not available"
        }
        setErrors(errorObj);

        if (Object.values(errors).length > 0) {
            return
        } else {
            const booking = { "startDate": startDate, "endDate": endDate, "spotId": spot.id }
            await dispatch(createBookingThunk(+spot.id, booking))
            closeModal()
        }
    }

    return (
        <div className="BookSpotModal">
            {user.id !== spot.ownerId ?
                <>
                    <h1>Book Your Spot</h1>
                    {Object.values(errors).map(error => {
                        <p className="errors">{error}</p>
                    })}
                    <form onSubmit={handleSubmit}>
                        Start
                        <input
                            type="date"
                            onChange={(e) => setStartDate(e.target.value)}
                            value={startDate}
                            min={today}
                        ></input>
                        End
                        <input
                            type="date"
                            onChange={(e) => setEndDate(e.target.value)}
                            value={endDate}
                            min={today < startDate ? startDate : today}
                        ></input>
                        <button type="submit">Submit</button>
                    </form>
                </>
                : <h1>An owner cannot book their own spot</h1>}
        </div>

    )
}

export default BookSpot
