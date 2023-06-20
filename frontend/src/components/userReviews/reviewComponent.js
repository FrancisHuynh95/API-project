import { useSelector, useDispatch } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import UpdateReview from "../updateReview"

function ReviewComponent({ review }) {

    function dateFormat(review) {
        let newReviewFormat = new Date(review.createdAt).toLocaleDateString('en-US', {
            month: "long",
            year: "numeric"
        })
        return (
            <>
                <p id="formattedDate">{newReviewFormat}</p>
            </>
        )
    }

    function handleDelete(reviewId) {
        console.log('handle delete', reviewId)

    }

    return (
        <div>
            <p className="manageReviewStuff">{`${review.Spot?.name}`}</p>
            <p className="manageReviewStuff">{dateFormat(review)}</p>
            <p className="manageReviewStuff">{`${review.review}`}</p>
            <div className="manageReviewStuffButtons">
                <OpenModalButton
                    buttonText={"Update"}
                    modalComponent={<UpdateReview review={review} />}
                />
                <button onClick={() => handleDelete(review.id)}>Delete</button>
            </div>
        </div>
    )
}

export default ReviewComponent
