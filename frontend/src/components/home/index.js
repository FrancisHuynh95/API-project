import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSpotThunk } from "../../store/spots";
import './home.css'

function Home() {
    const dispatch = useDispatch()
    const getAllSpots = useSelector(state => state.spots)
    const spotsArray = Object.values(getAllSpots)

    useEffect(() => {
        dispatch(getSpotThunk())
    }, [dispatch])

    const newReview = 'New'

    return (
        <>
            <h2>Home</h2>
            <div className="cardHolder">
                {spotsArray.map(spot =>
                    <div className="spotCard">
                        <div className="spotPic">
                            <img className="previewImage" src={spot.previewImage}></img>
                        </div>
                        <div className="spotInfo">
                            <div className="leftSide">
                                <div className="location">
                                    <div className="cityState">
                                        <p>{`${spot.city}, ${spot.state}`}</p>
                                    </div>
                                    <div className="price">
                                        ${spot.price} night
                                    </div>
                                </div>
                            </div>
                            <div className="rightSide">
                                <span>
                                    <p>Star icon</p>
                                    <p>{spot.avgRating === 'No rating recorded' ? newReview : spot.avgRating} </p>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Home;
