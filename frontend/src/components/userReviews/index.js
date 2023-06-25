import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getReviewByTheUserThunk } from "../../store/review"
import ReviewComponent from "./reviewComponent"
import './manageReview.css'


function UserReviews(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews)
    const reviewsArray = Object.values(reviews)

    useEffect(() => {
        dispatch(getReviewByTheUserThunk())
    },[dispatch, reviewsArray.length])
    if(!reviews) return <p>Loading</p>
    return(
        <>
        <h1>Manage Reviews</h1>
        {reviewsArray.map(review =>
            < ReviewComponent review={review}/>
            )}
        </>

    )
}

export default UserReviews
