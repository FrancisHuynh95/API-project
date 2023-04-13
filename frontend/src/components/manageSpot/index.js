import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { getSpotThunk } from "../../store/spots";
import './manageSpot.css'
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";

function ManageSpot() {
    const spot = useSelector(state => state.spots)
    const user = useSelector(state => state.session)
    const dispatch = useDispatch()

    const spotArray = Object.values(spot)
    const filteredSpots = spotArray.filter(spot => spot.ownerId === user.user.id)

    useEffect(() => {
        dispatch(getSpotThunk())
    }, [dispatch])

    const newReview = 'New'

    function DeleteSpotModal({ spotId }) {
        const dispatch = useDispatch();
        const { closeModal } = useModal();

        const spot = useSelector(state => state.spots)

        const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(deleteSpotThunk(spotId))
        };
        return (
            <>
                <h1>Confirm Delete</h1>
                <p>Are you sure you want to remove this spot from the listings?</p>
                <form onSubmit={handleSubmit}>
                    <button type="submit">Yes (Delete Spot)</button>
                    <button onClick={closeModal}> No (Keep Spot)</button>
                </form>
            </>
        );
    }

    function manageSpotBlockCreator() {
        return filteredSpots.map(spot =>
            <>
                <div key={spot.id}>
                    <div className="cardHolder">
                        <div className="cardHolderWithButtons">

                            <Link className="spotCard" to={`/spots/${spot?.id}`}>
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
                            </Link>
                            <div className="update-delete-buttons">
                                <Link to={`/spots/${spot?.id}/update`}>Update</Link>
                                <Link to={`/spots/${spot?.id}/delete`}>Delete</Link>
                                <li>
                                    <OpenModalButton
                                        buttonText="Delete Spot"
                                        modalComponent={<DeleteSpotModal spotId={spot.id} />}
                                    />
                                    <NavLink to={`/spots/${spot.id}/edit`}> <button>Update A Spot</button></NavLink>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="above-blocks">
                <h2>Manage Your Spots</h2>
                <NavLink to="/spots/new">Create A New Spot</NavLink>
            </div>
            <div className="spots-container">
                {manageSpotBlockCreator()}
            </div>
        </>
    )
}

export default ManageSpot;
