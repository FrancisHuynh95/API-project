import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneSpotThunk } from "../../store/spots";

import './getSpotById.css'
import { getReviewByTheUserThunk, getReviewForSpotThunk } from "../../store/review";


function GetSpotById() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spots = useSelector(state => state.singleSpot)
    const users = useSelector(state => state.session)
    const reviewsOfSpot = useSelector(state => state.reviews)['2']

    const spot = spots[spotId]
    const currentUser = users.user

    const previewImage = spot?.SpotImages.filter(spot => spot.preview === true)
    const otherImages = spot?.SpotImages.filter(spot => spot.preview !== true)
    const hostInfo = spot?.Owner
    const noReview = "New"


    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
        dispatch(getReviewByTheUserThunk(currentUser.id))
        dispatch(getReviewForSpotThunk(spotId))
    }, [dispatch])

    function reserveButton() {
        alert("Feature Coming Soon...")
    }

            // console.log(user.user ? user.user?.id ? user.user.id === hostInfo.id ? <p>test no</p> : <p>test button</p> : null : null)

    //{currentUser ? spot?.Owner.id === currentUser?.id ? null :  : null}


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
                        {otherImages && otherImages.forEach(image => <img className="getOneOtherImage" src={image['url']}></img>)}
                    </div>
                </div>
                <div className="bigAssDiv">

                <div className="Host-Info">
                    <h2>Hosted by {hostInfo?.firstName} {hostInfo?.lastName}</h2>
                    <p>Aliquam erat volutpat. Etiam odio massa, vehicula a placerat quis, maximus sed lacus. Sed in tincidunt libero. Maecenas mollis congue leo. Cras posuere egestas lobortis. Curabitur sit amet faucibus ipsum, quis hendrerit purus. Praesent volutpat, diam id eleifend scelerisque, magna sapien lobortis elit, ut pulvinar quam enim a tellus. Aenean ultrices ipsum porta elit commodo suscipit. Morbi viverra vulputate augue et posuere. Ut mi nulla, convallis ac convallis at, vestibulum in lacus. Proin ut nisl congue diam laoreet tristique. In a tellus quis urna pulvinar egestas at vitae purus. Proin id lobortis nulla. In feugiat eu lectus eget luctus. Aenean quis nulla nec sem pharetra iaculis. Proin vitae lectus nec libero molestie sagittis.</p>
                    <div className="smallBox">
                        <div className="reviewInfo">
                            <div className="topSpanDiv">
                                <div className="textInTheBox">
                                    <p className="price">${spot?.price} night</p>
                                    <i className="fas fa-user-circle"></i>
                                    <p className="avgStarRating">{spot?.avgStarRating === 'No rating recorded' ? noReview : spot?.avgStarRating} · </p>
                                    <p className="starReviewCount">{spot?.numReviews} reviews</p>
                                </div>
                                <button className="reserveButton" onClick={reserveButton}>Reserve</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="bottom-half">
                <h1>TEST</h1>
                <div className="bottomshit">
                    <i className="fas fa-user-circle"></i>
                    <p className="avgStarRating">{spot?.avgStarRating === 'No rating recorded' ? noReview : spot?.avgStarRating} · </p>
                    <p className="starReviewCount">{spot?.numReviews} reviews</p>
                </div>
                {currentUser ? spot?.Owner.id === currentUser?.id ? null : <button onClick={reserveButton}>Post Your Review</button> : null}
            </div>
        </>
    )
}

export default GetSpotById;
