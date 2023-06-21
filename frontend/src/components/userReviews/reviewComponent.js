import { useSelector, useDispatch } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import UpdateReview from "../updateReview"
import DeleteReview from "../deleteReviewModal"

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

    return (
        <>
            {review !== "User has no reviews" ? <div>
                <p className="manageReviewStuff">{`${review.Spot?.name}`}</p>
                <p className="manageReviewStuff">{dateFormat(review)}</p>
                <p className="manageReviewStuff">{`${review.review}`}</p>
                <div className="manageReviewStuffButtons">
                    <OpenModalButton
                        buttonText={"Update"}
                        modalComponent={<UpdateReview review={review} />}
                    />
                    <OpenModalButton
                        buttonText={"Delete"}
                        modalComponent={<DeleteReview review={review} />}
                    />
                </div>
            </div> : <p>You don't have any reviews</p>}
        </>
    )
}

export default ReviewComponent
