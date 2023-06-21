import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import {deleteReviewThunk} from "../../store/review"

function DeleteReview({review}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    async function handleDelete(){
        console.log('delete', review.id)
        if(review.review !== "User has no reviews"){
            await dispatch(deleteReviewThunk(review.id))
            closeModal()
        }
    }
    return (
        <div className="DeleteReviewModal">
            <h1>Delete Review</h1>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={() => handleDelete()}>Delete</button>
            <button onClick={() => closeModal()}>Cancel</button>
        </div>
    )
}

export default DeleteReview
