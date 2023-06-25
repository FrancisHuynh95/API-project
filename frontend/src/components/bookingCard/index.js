import DeleteBooking from "../deleteBooking"
import OpenModalButton from "../OpenModalButton"
import UpdateBooking from "../updateBooking"

function BookingCard({ booking }) {
    return (
        <div className="bookingSpotCard" title={`${booking.Spot?.name}`}>
            <img className="bookingSpotImage" src={`${booking.Spot?.previewImage}`}></img>
            <p className="bookingSpotPrice">${`${booking.Spot?.price}`}</p>
            <div className="manageBookingButtons">
                <div className="updateBookingButton">
                    < OpenModalButton
                        buttonText={"Update"}
                        modalComponent={<UpdateBooking booking={booking} />}
                    />
                </div>
                <div className="deleteBookingButton">
                    < OpenModalButton
                        buttonText={"Delete"}
                        modalComponent={<DeleteBooking bookingId={booking.id} endDate={booking.endDate} />}
                    />
                </div>
            </div>
            {/* <button onClick={() => handleEdit(booking.id)}>Edit Booking</button>
        <button onClick={() => handleDelete(booking.id)}>Delete Booking</button> */}
        </div>
    )
}

export default BookingCard
