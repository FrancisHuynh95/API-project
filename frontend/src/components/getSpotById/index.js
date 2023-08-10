import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneSpotThunk } from "../../store/spots";
import CreateReviewModal from "../createReviewModal";
import OpenModalButton from "../OpenModalButton";
import './getSpotById.css'
import { getReviewForSpotThunk } from "../../store/review";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/review";
import { useHistory } from "react-router-dom";
import UpdateReview from "../updateReview";
import BookSpot from "../bookSpotModal";
import { getBookingThunk } from "../../store/bookings";
import OpenImageModalButton from "../OpenModalButton/image";
import ImageModalComponent from "../imageModal";
import { ImageModalProvider } from "../../../src/context/ImageModal"
import { useImageModal } from "../../../src/context/ImageModal";



function GetSpotById() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spots = useSelector(state => state.spots)
    const users = useSelector(state => state.session)
    const spotReviews = useSelector(state => state.reviews)
    const spot = spots[spotId]
    const noImage = "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"
    const bookings = useSelector(state => state.bookings)


    const reviewArray = Object.values(spotReviews)
    const theUser = users['user']
    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
        dispatch(getReviewForSpotThunk(spotId))
    }, [dispatch, reviewArray.length])

    useEffect(() => {
        if (spots) {
            dispatch(getBookingThunk(spotId))
        }
    }, [dispatch])

    function generateReview() {
        if (reviewArray[0] === `Spot doesn't have any reviews`) {
            return <p>Be the first to post a review!</p>
        }
        return reviewArray.toReversed().map(review =>
            <>
                <div className="user-reviews">
                    {<p id="username">{review.User?.firstName}</p>}
                    {dateFormat(review)}
                    <p id="userReview">{review.review}</p>
                    <div className="reviewButtonsSpot">

                        {theUser?.id === review.userId
                            ? generateDeleteModal(review.id, review.userId, review)
                            : null}
                        <div className="updateReviewButtonSpot">
                            {theUser?.id === review.userId ?
                                <OpenModalButton
                                    buttonText="Update"
                                    modalComponent={< UpdateReview review={review} />}
                                /> : null}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    function dateFormat(review) {
        let newReviewFormat = new Date(review.createdAt).toLocaleDateString('en-US', {
            month: "long",
            year: "numeric"
        })
        return (
            <>
                <p id="formattedDate">{newReviewFormat}</p>
            </>
        )
    }

    function DeleteReviewModal({ reviewId }) {
        const spot = useSelector(state => state.spots)
        const { closeModal } = useModal();
        const dispatch = useDispatch();
        const history = useHistory()

        const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(deleteReviewThunk(reviewId))
                .then(() => dispatch(getReviewForSpotThunk(spotId)))
            dispatch(getOneSpotThunk(spotId))
            closeModal()
        };
        return (
            <>
                <div id="deleteSpotDiv">
                    <h1 id="deleteSpotTitle">Confirm Delete</h1>
                    <p>Are you sure you want to remove this spot from the listings?</p>
                    <form onSubmit={handleSubmit}>
                        <div id="deleteOrKeep">
                            <button id="deleteReviewButton" type="submit">Yes (Delete Review)</button>
                            <button id="keepReviewButton" onClick={closeModal}> No (Keep Spot)</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }

    function generateDeleteModal(reviewId, reviewUserId, review) {
        if (theUser && theUser?.id === reviewUserId) {
            return <div className="deleteReviewModal">
                <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteReviewModal reviewId={reviewId} />}
                />
            </div>
        }
    }
    const currentUser = users.user

    let previewImage
    let otherImages
    let allPics = []

    const hostInfo = spot?.Owner
    const noReview = "New"

    const filteredReviewsByCurrentUser = reviewArray.filter(array => array.userId === currentUser?.id)
    if (spot === undefined) {
        <p>{`Spot doesn't have any images`}</p>
    } else {
        if (spot.SpotImages && spot.SpotImages !== `Spot doesn't have any images`) {
            previewImage = spot?.SpotImages?.filter(spot => spot.preview === true)
            otherImages = spot?.SpotImages?.filter(spot => spot.preview !== true)
            spot.SpotImages.sort((a,b) => a.id - b.id).forEach(image => allPics.push(image.url))
        }
    }
   

    let newArr = [];
    if (otherImages?.length > 0) {
        otherImages.map(image => newArr.push(image.url))
    }
    while (newArr.length < 4) {
        newArr.push(noImage)
    }

    function generateModal() {
        if (currentUser) {
            if (currentUser?.id !== spot?.Owner?.id) {
                if (filteredReviewsByCurrentUser?.length === 0) {
                    return <div className="addReviewModal">
                        <OpenModalButton
                            buttonText="Post Your Review"
                            modalComponent={<CreateReviewModal spotId={spot?.id} />}
                        />
                    </div>
                }
            }
        }
    }
    return (
        <>
            <div className="everythingWrapper">
                <div className="topHalf">
                    <div className="name-location">
                        <h2>{spot?.name}</h2>
                        <p>{spot?.city}, {spot?.state}, {spot?.country}</p>
                    </div>
                    <div className="pictures">
                        <div id="previewImage">
                            {previewImage &&
                                <OpenImageModalButton
                                    buttonText={`${previewImage[0]['url']}`}
                                    modalComponent={<ImageModalComponent url={previewImage[0]['url']} allPics={allPics}/>}
                                />}
                            {/* {previewImage && <img className="getOnePreviewImage" id="imageClick" src={previewImage[0]['url']}></img>} */}
                        </div>
                        <div className="nonPreviewPics">
                            {newArr?.map((image, index) =>
                                // <img className="otherImages" id="imageClick" src={`${image}`}></img>
                                <OpenImageModalButton
                                    buttonText={`${image}`}
                                    modalComponent={<ImageModalComponent url={image} allPics={allPics}/>}
                                />
                            )}
                        </div>
                    </div>
                    <div className="bigOlDiv">
                        <div className="Host-Info">
                            <h2>Hosted by {hostInfo?.firstName} {hostInfo?.lastName}</h2>
                            {spot && <p id="spotDescription">{spot.description}</p>}
                        </div>
                        <div className="reviewInfo">
                            <div className="smallReviewInfoContainer">
                                <div id="pricePerNight">
                                    <p className="price">${spot?.price}</p>
                                    <label> night</label>
                                </div>
                                <div id="reviewInfo">
                                    <i class="fa-solid fa-star"></i>
                                    <p className="avgStarRating">{spot?.avgStarRating === 'No rating recorded' ? noReview : `${spot?.avgStarRating} · `}</p>
                                    {spot?.avgStarRating !== 'No rating recorded' && <p className="starReviewCount">{spot?.numReviews} </p>}
                                    {spot?.avgStarRating !== 'No rating recorded' && <p>{spot?.numReviews === 1 ? "Review" : "Reviews"}</p>}
                                </div>
                            </div>
                            <div className="reserveButtonContainer">
                                <OpenModalButton
                                    buttonText={"Reserve"}
                                    modalComponent={<BookSpot spot={spot} />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-half">
                    <div className="bottomstuff">
                        <i class="fa-solid fa-star"></i>
                        <p className="avgStarRating">{spot?.avgStarRating === 'No rating recorded' ? noReview : spot?.avgStarRating}</p>
                        <p className="starReviewCount">{spot?.numReviews ? spot?.numReviews >= 2 ? ` · ${spot?.numReviews} Reviews` : spot?.numReviews === 1 ? " · 1 Review" : null : null} </p>
                    </div>
                    {generateModal()}
                </div>
                {generateReview()}
            </div>
        </>
    )
}

export default GetSpotById;
