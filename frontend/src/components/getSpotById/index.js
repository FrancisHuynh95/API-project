import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneSpotThunk } from "../../store/spots";
import CreateReviewModal from "../createReviewModal";
import OpenModalButton from "../OpenModalButton";

import './getSpotById.css'
import { getReviewForSpotThunk } from "../../store/review";




function GetSpotById() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spots = useSelector(state => state.spots)
    const users = useSelector(state => state.session)
    const spotReviews = useSelector(state => state.reviews)

    const reviewArray = Object.values(spotReviews)

    function generateReview() {
        return reviewArray.map(review =>
            <>
                <div className="user-reviews">
                    <p>{review.User?.firstName}</p>
                    <p>{review.createdAt}</p>
                    <p>{review.review}</p>
                </div>
            </>
        )
    }

    const spot = spots[spotId]
    const currentUser = users.user

    let previewImage
    let otherImages

    const hostInfo = spot?.Owner
    const noReview = "New"

    const filteredReviewsByCurrentUser = reviewArray.filter(array => array.ownerId === currentUser?.id)
    if (spot === undefined) {
        <p>{`Spot doesn't have any images`}</p>
    } else {
        if (spot.SpotImages && spot.SpotImages !== `Spot doesn't have any images`) {
            previewImage = spot?.SpotImages?.filter(spot => spot.preview === true)
            otherImages = spot?.SpotImages?.filter(spot => spot.preview !== true)
        }
    }

    let newArr = [];
    if (otherImages?.length > 0) {
        otherImages.map(image => newArr.push(image.url))
    }

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
        dispatch(getReviewForSpotThunk(spotId))

    }, [dispatch])

    function reserveButton() {
        alert("Feature Coming Soon...")
    }

    return (
        <>
            <div className="topHalf">
                <div className="name-location">
                    <h2>{spot?.name}</h2>
                    <p>{spot?.city}, {spot?.state}, {spot?.country}</p>
                </div>
                <div className="pictures">
                    {previewImage && <img className="getOnePreviewImage" src={previewImage[0]['url']}></img>}
                    <div className="nonPreviewPics">
                        {newArr?.map(image => <img className="otherImages" src={`${image}`}></img>)}
                    </div>
                </div>
                <div className="bigAssDiv">

                    <div className="Host-Info">
                        <h2>Hosted by {hostInfo?.firstName} {hostInfo?.lastName}</h2>
                        {spot && <p>{spot.description}</p>}
                        <div className="smallBox">
                            <div className="reviewInfo">
                                <div className="topSpanDiv">
                                    <div className="textInTheBox">
                                        <p className="price">${spot?.price} night</p>
                                        <i className="fas fa-user-circle"></i>
                                        <p className="avgStarRating">{spot?.avgStarRating === 'No rating recorded' ? noReview : spot?.avgStarRating} · </p>
                                        {spot?.avgStarRating !== 'No rating recorded' && <p className="starReviewCount">{spot?.numReviews} </p>}
                                        {spot?.avgStarRating !== 'No rating recorded' && <p>{spot?.numReviews === 1 ? "Review" : "Reviews"}</p>}
                                    </div>
                                    <button className="reserveButton" onClick={reserveButton}>Reserve</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-half">
                <div className="bottomshit">
                    <i className="fas fa-user-circle"></i>
                    <p className="avgStarRating">{spot?.avgStarRating === 'No rating recorded' ? noReview : spot?.avgStarRating} · </p>
                    <p className="starReviewCount">{spot?.numReviews} reviews</p>
                </div>
                {currentUser
                    ? spot?.Owner?.id
                        === currentUser?.id
                        ? null
                        : filteredReviewsByCurrentUser.length > 0
                            ? null
                            : <div className="addReviewModal">
                                <OpenModalButton
                                    buttonText="Post Your Review"
                                    modalComponent={<CreateReviewModal spotId={spot?.id} />}
                                />
                            </div>
                    : null}
            </div>
            {generateReview()}

        </>
    )
}

export default GetSpotById;
