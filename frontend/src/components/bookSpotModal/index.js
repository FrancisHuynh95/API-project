import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { getBookingThunk } from "../../store/bookings"

function BookSpot({spot}) {
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const bookings = useSelector(state => state.bookings)

    useEffect(() => {
        dispatch(getBookingThunk(spot.id))
    }, [dispatch])

    const today = Date.now()
    function handleSubmit(e) {
        e.preventDefault()
        console.log(startDate)
        console.log(bookings)
    }

    return (
        <div className="BookSpotModal">
            <h1>Book Your Spot</h1>
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
        </div>

    )
}

export default BookSpot
