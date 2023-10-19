import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getBookingThunk } from "../../store/bookings"
import { useModal } from "../../context/Modal"
import { updateBookingThunk } from "../../store/bookings"
import './updateBooking.css'

function UpdateBooking({ booking }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const allBookings = useSelector(state => state.bookings.bookings)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getBookingThunk(booking?.Spot.id))
    }, [dispatch])

    function bookingStuff() {
        for (let booking1 of allBookings) {
            const bookingStart = new Date(booking1.startDate)
            const bookingEnd = new Date(booking1.endDate)
            const newStart = new Date(startDate)
            const newEnd = new Date(endDate)

            const bookingStartTime = bookingStart.getTime()
            const bookingEndTime = bookingEnd.getTime()
            const newStartTime = newStart.getTime()
            const newEndTime = newEnd.getTime()

            if (
                (newStartTime <= bookingStartTime && newEndTime >= bookingStartTime) ||
                (newStartTime >= bookingStartTime && newStartTime <= bookingEndTime) ||
                (bookingStartTime >= newStartTime && newEndTime >= bookingEndTime)

            ) return false;
            else {
                return true
            }
        }
    }

    const today = new Date().toISOString().split("T")[0];

    async function handleSubmit(e) {
        let submitErrors = {}
        e.preventDefault()
        if (bookingStuff() === false) {
            submitErrors.dates = "This date range is not available"
        }
        setErrors(submitErrors);

        if (Object.values(submitErrors).length > 0) {
            return
        } else {
            let err
            const newBooking = { "startDate": startDate, "endDate": endDate, spotId: booking.spotId }
            try {
                await dispatch(updateBookingThunk(+booking.id, newBooking))
            } catch(e){
                err = await e.json()
                setErrors(err)
                return
            }
            if(err === undefined) closeModal()
        }
    }

    return (
        <div className="updateBookingModal">
            <h1 className="modalH1">Update Booking</h1>
            <form className="datesInput">
                {Object.values(errors).length > 0 &&
                    <p className="errors">{errors.message}</p>
                }
                <div className="startInput">
                    <label>
                        Start : <input
                            type="date"
                            onChange={(e) => setStartDate(e.target.value)}
                            value={startDate}
                            min={today}
                        ></input>
                    </label>
                </div>
                <div className="endInput">
                    <label>
                        End : <input
                            type="date"
                            onChange={(e) => setEndDate(e.target.value)}
                            value={endDate}
                            min={today < startDate ? startDate : today}
                        ></input>
                    </label>
                </div>
            </form>
            <div className="submitButtonContainer">
            </div>
            <button className="updateBookingButtonModal" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default UpdateBooking
