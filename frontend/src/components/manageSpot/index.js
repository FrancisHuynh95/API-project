import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { getSpotThunk } from "../../store/spots";
import './manageSpot.css'
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import { useHistory } from "react-router-dom";

function ManageSpot() {
    const spot = useSelector(state => state.spots)
    const user = useSelector(state => state.session)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getSpotThunk())
    }, [dispatch])

    if (!spot) return null
    const spotArray = Object.values(spot)
    const filteredSpots = spotArray.filter(spot => spot.ownerId === user.user.id)
    const newReview = 'New'

    function DeleteSpotModal({ spotId }) {
        const dispatch = useDispatch();
        const { closeModal } = useModal();

        const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(deleteSpotThunk(spotId))
            closeModal()
        };
        return (
            <div className="deleteSpotModal">
                <h1 className="deleteSpotH1">Confirm Delete</h1>
                <p className="deleteSpotMessage">Are you sure you want to remove this spot from the listings?</p>
                <form onSubmit={handleSubmit}>
                    <div className="deleteSpotButtons">
                    <button id="noDelete" onClick={closeModal}> No (Keep Spot)</button>
                    <button id="yesDelete">Yes (Delete Spot)</button>
                    </div>
                </form>
            </div>
        );
    }

    function manageSpotBlockCreator() {
        return filteredSpots.map(spot =>

                    <div key={spot.id} className="cardHolderWithButtons">
                        <Link className="spotCardManageSpot" to={`/spots/${spot?.id}`}>
                            <div className="spotPic">
                                <img className="previewImage" id="manageSpotPreviewImage" src={spot?.previewImage}></img>
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
                                    <span id="manageSpotReview">
                                        <i class="fa-solid fa-star"></i>
                                        <p>{spot.avgRating === 'No rating recorded' ? newReview : spot.avgRating} </p>
                                    </span>
                                </div>
                            </div>
                        </Link>
                        <div className="updateDeleteButtons">
                            <div className="manageSpotButtons">
                                <NavLink to={`/spots/${spot.id}/edit`}>
                                    <button className="updateASpotButton">Update A Spot</button></NavLink>
                            </div>
                            <div className="deleteSpotButton">
                                <OpenModalButton
                                    buttonText="Delete Spot"
                                    modalComponent={<DeleteSpotModal spotId={spot.id} />}
                                />
                            </div>
                        </div>
                    </div>
        )
    }

    return (
        <>
            <div className="everythingWrapper">
                <div className="manageSpots">
                    <div className="above-blocks">
                        <h2>Manage Your Spots</h2>
                        {filteredSpots.length === 0 ? <NavLink to="/spots/new">Create A New Spot</NavLink> : null}
                    </div>
                    <div id="spotsContainerManageSpot">
                        {manageSpotBlockCreator()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageSpot;
