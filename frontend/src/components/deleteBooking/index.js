import { removeBookingThunk } from "../../store/bookings"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"

function DeleteBooking({ bookingId, endDate }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const today = new Date()
    const endDate2 = new Date(endDate)
    const endDateTime = endDate2.getTime()
    const todayTime = today.getTime()


    async function handleDelete() {
        await dispatch(removeBookingThunk(bookingId))
        closeModal()
    }
    function handleCancel() {
        closeModal()
    }
    return (
        <div className="deleteBookingModal">
            {endDateTime > todayTime ?
                <>
                    <h1>Are you sure you want to delete this booking?</h1>
                    <div>
                        <button onClick={() => handleDelete()}>Yes</button>
                        <button onClick={() => handleCancel()}>Cancel</button>
                    </div>
                </>
                : <h1>You cannot delete an old booking</h1>}
        </div>
    )
}

export default DeleteBooking
