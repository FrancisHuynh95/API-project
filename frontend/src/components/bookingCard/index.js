import DeleteBooking from "../deleteBooking"
import OpenModalButton from "../OpenModalButton"

function BookingCard({booking}){
    return (
        <div className="bookingSpotCard" title={`${booking.Spot?.name}`}>
        <img src={`${booking.Spot?.previewImage}`}></img>
        <p>${`${booking.Spot?.price}`}</p>
        < OpenModalButton
        buttonText={"Delete"}
        modalComponent={<DeleteBooking bookingId={booking.id}/>}
         />
        {/* <button onClick={() => handleEdit(booking.id)}>Edit Booking</button>
        <button onClick={() => handleDelete(booking.id)}>Delete Booking</button> */}
    </div>
    )
}

export default BookingCard
