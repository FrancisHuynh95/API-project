import { useState, useEffect } from "react"
import StarRating from "../starRating";


function UpdateReview({ review }) {
    const [newReview, setNewReview] = useState("")
    const [stars, setStars] = useState(0)

    const onChange = (number) => {
        setStars(parseInt(number));
    };

    const handleSubmit = () => {
        console.log(stars)
        console.log(newReview)
    }

    useEffect(() => {
        if(review){
            setStars(review.stars)
            setNewReview(review.review)
        }
    }, [])

    return (
        <div className="UpdateReviewModal">
            <h1>Update Review</h1>
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
            <button onClick={() => handleSubmit()}>Submit</button>
        </div>
    )
}

export default UpdateReview
