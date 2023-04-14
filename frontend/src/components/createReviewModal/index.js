import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { createReviewThunk } from "../../store/review";
import { useState } from "react";
import { getOneSpotThunk } from "../../store/spots";

function CreateReviewModal({spotId}){
    const [review, setReview] = useState('')
    const [stars, setStar] = useState(0)

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createReviewThunk({review, stars},spotId))
        dispatch(getOneSpotThunk(spotId))
        closeModal()
    };
    return (
        <>
            <h1>How was your stay?</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Leave your review here..." value={review} onChange={e => setReview(e.target.value)}></input>
                <span>
                    <input type="text" value={stars} onChange={e => setStar(e.target.value)}></input>
                </span>
                <button type="submit">Submit Your Review</button>

            </form>
        </>
    );
}

export default CreateReviewModal
