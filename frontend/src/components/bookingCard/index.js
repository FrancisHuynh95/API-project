import DeleteBooking from "../deleteBooking"
import OpenModalButton from "../OpenModalButton"
import UpdateBooking from "../updateBooking"

function BookingCard({ booking }) {
    function dateFormat(booking) {
        let newStartDate = new Date(booking.startDate).toLocaleDateString('en-US', {
            month: "long",
            day:"2-digit",
            year: "numeric"
        })
        let newEndDate = new Date(booking.endDate).toLocaleDateString('en-US', {
            month: "long",
            day:"2-digit",
            year: "numeric"
        })
        return (
            <>
                <p id="formattedDate">{newStartDate} - {newEndDate}</p>
            </>
        )
    }



    return (
        <div className="bookingSpotCard" title={`${booking.Spot?.name}`}>
            <img className="bookingSpotImage" src={`${booking.Spot?.previewImage}`}></img>
            {dateFormat(booking)}
            <p className="bookingSpotPrice">${`${booking.Spot?.price}`} night</p>
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
