import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getReviewByTheUserThunk } from "../../store/review"
import ReviewComponent from "./reviewComponent"


function UserReviews(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews)
    const reviewsArray = Object.values(reviews)

    useEffect(() => {
        dispatch(getReviewByTheUserThunk())
    },[dispatch])
    if(!reviews) return <p>Loading</p>
    return(
        <>
        <h1>Manage Reviews</h1>
        {reviewsArray.map(review =>
        <div className="reviewCard">
            < ReviewComponent review={review}/>
        </div>
            )}
        </>

    )
}

export default UserReviews
