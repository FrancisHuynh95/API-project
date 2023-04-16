import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { createReviewThunk } from "../../store/review";
import { useState } from "react";
import { getOneSpotThunk } from "../../store/spots";
import StarRating from "../starRating";

function CreateReviewModal({ spotId }) {
    const [review, setReview] = useState('')
    const [stars, setStar] = useState(0)

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createReviewThunk({ review, stars }, spotId))
        await dispatch(getOneSpotThunk(spotId))
        closeModal()
    };
    const onChange = (number) => {
        setStar(parseInt(number));
      };

    return (
        <>
            <h1>How was your stay?</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Leave your review here..." value={review} onChange={e => setReview(e.target.value)}></input>
                <span>
                    <StarRating
                    disabled={false}
                    onChange={onChange}
                    rating={stars}
                        />
                </span>
                <button disabled={review.length < 10 || stars === 0 ? true : false} type="submit">Submit Your Review</button>

            </form>
        </>
    );
}

export default CreateReviewModal
