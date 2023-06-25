import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import {deleteReviewThunk} from "../../store/review"
import './deleteReview.css'

function DeleteReview({review}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    async function handleDelete(){
        if(review.review !== "User has no reviews"){
            await dispatch(deleteReviewThunk(review.id))
            closeModal()
        }
    }
    return (
        <div className="DeleteReviewModal">
            <h1>Delete Review</h1>
            <p>Are you sure you want to delete this review?</p>
            <div className="deleteReviewButtons">
            <button onClick={() => handleDelete()}>Delete</button>
            <button onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteReview
