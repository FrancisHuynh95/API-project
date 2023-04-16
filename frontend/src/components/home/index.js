import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSpotThunk } from "../../store/spots";
import './home.css'
import { Link, NavLink, useHistory } from "react-router-dom";

function Home() {
    const history = useHistory()
    const dispatch = useDispatch()
    const getAllSpots = useSelector(state => state.spots)
    const spotsArray = Object.values(getAllSpots)

    const today2 = new Date().toLocaleDateString('en-US', {
        month: "long",
        year: "numeric"
    })

    useEffect(() => {
        dispatch(getSpotThunk())
    }, [dispatch])

    const newReview = 'New'

    return (
        <>
            <div className="everythingWrapper">
                <div className="cardHolder">
                    {spotsArray.map(spot =>
                        <Link title={spot?.name} className="spotCard" to={`/spots/${spot?.id}`}>
                            <div className="spotPic">
                                <img className="previewImage" src={spot?.previewImage}></img>
                            </div>
                            <div className="spotInfo">
                                <div className="leftSide">
                                    <div className="location">
                                        <div className="cityState">
                                            <p>{`${spot.city}, ${spot.state}`}</p>
                                        </div>
                                        <div className="price">
                                            ${spot.price}
                                            <label> night</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="rightSide">
                                    <span id="homeStar">
                                        <i class="fa-solid fa-star"></i>
                                        <p>{spot.avgRating === 'No rating recorded' ? newReview : spot.avgRating} </p>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;
