import { removeBookingThunk } from "../../store/bookings"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"

function DeleteBooking({bookingId}) {
const {closeModal} = useModal()
const dispatch = useDispatch()

async function handleDelete(){
    await dispatch(removeBookingThunk(bookingId))
    closeModal()
}
function handleCancel(){
    closeModal()
}
    return (
        <div className="deleteBookingModal">
            <h1>Are you sure you want to delete this booking?</h1>
            <div>
            <button onClick={() => handleDelete()}>Yes</button>
            <button onClick={() => handleCancel()}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteBooking
