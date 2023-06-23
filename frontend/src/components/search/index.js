import { useParams, Link } from "react-router-dom/cjs/react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getSpotThunk } from "../../store/spots"
import "../home/home.css"


function Search() {
    const dispatch = useDispatch()
    const { keywords } = useParams()
    const splitKeywords = keywords.split('_')
    const allSpots = useSelector(state => state.spots)
    const allSpotsArray = Object.values(allSpots)
    const newReview = 'New'

    const filteredSpots = allSpotsArray.filter(spot => {
        for (let keyword of splitKeywords) {
            if (
                spot.address === keyword ||
                spot.city === keyword ||
                spot.country === keyword ||
                spot.name === keyword ||
                spot.state === keyword ||
                spot.price === +keyword
            ) return true
        }
    })

    console.log(filteredSpots)

    useEffect(() => {
        dispatch(getSpotThunk())
    }, [dispatch])
    return (

        <div className="everythingWrapper">
            <h1>Search</h1>
            <div className="cardHolder">
                {filteredSpots.map(spot =>
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
        </div >


    )
}

export default Search
