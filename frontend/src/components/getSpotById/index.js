import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneSpotThunk } from "../../store/spots";

function GetSpotById() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spots = useSelector(state => state.singleSpot)
    const spot = spots[spotId]

    const previewImage = spot?.SpotImages.filter(spot => spot.preview === true)
    const otherImages = spot?.SpotImages.filter(spot => spot.preview !== true)
    const hostInfo = spot?.Owner
    const noReview = "New"


    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
    }, [dispatch])

    function reserveButton() {
        alert("Feature Coming Soon...")
    }





    return (
        <>
            <div className="topHalf">
                <div className="name-location">
                    <h2>{}spot.name</h2>
                    <span>
                        <p>{spot?.city}</p>
                        <p>{spot?.state}</p>
                        <p>{spot?.country}</p>
                    </span>
                </div>
                <div className="pictures">
                    {previewImage && <img className="getOnePreviewImage" src={previewImage[0]['url']}></img>}
                    <div className="nonPreviewPics">
                        {otherImages && otherImages.forEach(image => <img className="getOneOtherImage" src={image['url']}></img>)}
                    </div>
                </div>
                <div className="Host-Info">
                    <h2>Hosted by {hostInfo?.firstName} {hostInfo?.lastName}</h2>
                    <p>Aliquam erat volutpat. Etiam odio massa, vehicula a placerat quis, maximus sed lacus. Sed in tincidunt libero. Maecenas mollis congue leo. Cras posuere egestas lobortis. Curabitur sit amet faucibus ipsum, quis hendrerit purus. Praesent volutpat, diam id eleifend scelerisque, magna sapien lobortis elit, ut pulvinar quam enim a tellus. Aenean ultrices ipsum porta elit commodo suscipit. Morbi viverra vulputate augue et posuere. Ut mi nulla, convallis ac convallis at, vestibulum in lacus. Proin ut nisl congue diam laoreet tristique. In a tellus quis urna pulvinar egestas at vitae purus. Proin id lobortis nulla. In feugiat eu lectus eget luctus. Aenean quis nulla nec sem pharetra iaculis. Proin vitae lectus nec libero molestie sagittis.</p>
                </div>
                <div className="smallBox">
                    <div className="reviewInfo">
                    <p className="price">${spot?.price} night</p>
                    <p>Star Icon</p>
                    <p className="avgStarRating">{spot?.avgStarRating === 'No rating recorded' ? noReview : spot?.avgStarRating}</p>
                    <p className="starReviewCount">{spot?.numReviews} reviews</p>
                    </div>
                    <button className="reserveButton" onClick={reserveButton}>Reserve</button>
                </div>
            </div>
            <div className="bottom-half">
                <div className="reviewInfo">
                    <p className="price">${spot?.price} night</p>
                    <p>Star Icon</p>
                    <p className="avgStarRating">{spot?.avgStarRating === 'No rating recorded' ? noReview : spot?.avgStarRating}</p>
                    <p className="starReviewCount">{spot?.numReviews} reviews</p>
                </div>
            </div>
        </>
    )
}

export default GetSpotById;
