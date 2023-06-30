import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { createReviewThunk } from "../../store/review";
import { useState } from "react";
import { getOneSpotThunk } from "../../store/spots";
import StarRating from "../starRating";
import './createReview.css'

function CreateReviewModal({ spotId }) {
    const [review, setReview] = useState('')
    const [stars, setStar] = useState(0)
    const [errorss, setErrors] = useState({})
    let errors = {}

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(review.length < 10){
            errors.review = "Review must be at least 10 characters"
        }

        if(stars === 0){
            errors.stars = "Please choose the stars"
        }
        if(Object.values(errors).length > 0){
            setErrors(errors)
            return
        }


        await dispatch(createReviewThunk({ review, stars }, spotId))
        await dispatch(getOneSpotThunk(spotId))
        closeModal()
    };
    const onChange = (number) => {
        setStar(parseInt(number));
    };

    return (
        <>
            <div id="createReviewModalBox">
                <h1 id="createReviewTitle">How was your stay?</h1>
                {errorss.review && <p className="errors">{errorss.review}</p>}
                {errorss.stars && <p className="errors">{errorss.stars}</p>}
                <form onSubmit={handleSubmit}>
                    <textarea rows={8} cols={45} className="userInput" id="reviewInput" type="text" placeholder="Leave your review here..." value={review} onChange={e => setReview(e.target.value)}></textarea>
                    <div id="starDiv">
                        <div id="createStars">
                            <StarRating
                                disabled={false}
                                onChange={onChange}
                                rating={stars}
                            />
                        </div>
                        <p>Stars</p>
                    </div>
                    <div id="buttonDiv">
                        <button id="submitReviewButton"
                        // disabled={review.length < 10 || stars === 0 ? true : false}
                        type="submit">Submit Your Review</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateReviewModal
