import { useState, useEffect } from "react"
import StarRating from "../starRating";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { updateReviewThunk } from "../../store/review";
import './updateReview.css'


function UpdateReview({ review }) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const [newReview, setNewReview] = useState("")
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState({})
    useEffect(() => {
        if(review){
            setStars(review.stars)
            setNewReview(review.review)
        }
    }, [])

    const onChange = (number) => {
        setStars(parseInt(number));
    };

    const handleSubmit = async () => {
        let errorObj = {}
        if(newReview.length > 200){
            errorObj.review = "Review must be at most 200 characters long"
        }
        setErrors(errorObj)
        if(Object.values(errorObj).length > 0){
            return
        } else {
            let newReview2 = {}
            newReview2.stars = stars
            newReview2.review = newReview
            dispatch(updateReviewThunk(review.id, {"review": newReview, stars}))
            closeModal()
        }
    }


    return (
        <div className="UpdateReviewModal">
            <h1>Update Review</h1>
            {errors.review && <p className="errors">{errors.review}</p>}
            <div className="UpdateReviewModalInputs">
            <textarea rows={8} cols={45} className="userInput" id="reviewInput" type="text" placeholder="Leave your review here..." value={newReview} onChange={e => setNewReview(e.target.value)}></textarea>
            </div>
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
            <div className="updateReviewContainer">
            <button className="updateReviewButton" disabled={newReview.length < 10 || stars === 0 ? true : false} onClick={() => handleSubmit()}>Submit</button>
            </div>
        </div>
    )
}

export default UpdateReview
