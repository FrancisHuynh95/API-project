import DeleteBooking from "../deleteBooking"
import OpenModalButton from "../OpenModalButton"
import UpdateBooking from "../updateBooking"

function BookingCard({booking}){
    return (
        <div className="bookingSpotCard" title={`${booking.Spot?.name}`}>
        <img src={`${booking.Spot?.previewImage}`}></img>
        <p>${`${booking.Spot?.price}`}</p>
        < OpenModalButton
        buttonText={"Update"}
        modalComponent={<UpdateBooking booking={booking}/>}
         />
        < OpenModalButton
        buttonText={"Delete"}
        modalComponent={<DeleteBooking bookingId={booking.id} endDate={booking.endDate}/>}
         />
        {/* <button onClick={() => handleEdit(booking.id)}>Edit Booking</button>
        <button onClick={() => handleDelete(booking.id)}>Delete Booking</button> */}
    </div>
    )
}

export default BookingCard
