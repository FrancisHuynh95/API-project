import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getSpotThunk, updateSpotThunk } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";


function UpdateSpot() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const allSpots = useSelector(state => state.spots)
    useEffect(() => {
        dispatch(getSpotThunk())
    }, [dispatch])

    const spotArray = Object.values(allSpots)

    const filteredSpot = spotArray.filter(spot => spot.id === +spotId)


    const [country, setCountry] = useState(filteredSpot[0].country)
    const [address, setAddress] = useState(filteredSpot[0]?.address)
    const [city, setCity] = useState(`${filteredSpot[0]?.city}`)
    const [state, setState] = useState(`${filteredSpot[0]?.state}`)
    const [lng, setLng] = useState(`${filteredSpot[0]?.lng}`)
    const [lat, setLat] = useState(`${filteredSpot[0]?.lat}`)
    const [description, setDescription] = useState(`${filteredSpot[0]?.description}`)
    const [title, setTitle] = useState(`${filteredSpot[0]?.name}`)
    const [price, setPrice] = useState(`${filteredSpot[0]?.price}`)
    const [errors, setErrors] = useState({})
    const history = useHistory()


    async function formSubmit(e) {
        e.preventDefault()
        const errorObj = {}
        if (country.length === 0) errorObj.country = "Country is required"
        if (address.length === 0) errorObj.address = "Address is required"
        if (city.length === 0) errorObj.city = "City is required"
        if (state.length === 0) errorObj.state = "State is required"
        if (lng.length === 0) errorObj.lng = "Lng is required"
        if (lat.length === 0) errorObj.lat = "Lat is required"
        if (description.length < 30) errorObj.description = "Description needs a minimum of 30 characters"
        if (title.length === 0) errorObj.title = "Name is required"
        if (price.length === 0) errorObj.price = "Price is required"

        setErrors(errorObj)

        console.log('IN THE OBJECT.VALUES')
        if(Object.values(errors).length === 0){
            dispatch(updateSpotThunk({country, address, city, state, lng, lat, description, name: title, price}, +spotId))
            history.push(`/spots/${spotId}`)
        }
    }

    const user = useSelector(state => state.session.user)


    return (
        <>
            <form onSubmit={formSubmit}>
                <div className="section1">
                    <div className="topMsg">
                        <h2>Update your Spot</h2>
                        <h3>Where's your place located?</h3>
                        <p>Guests will only get your exact address once they booked a reservation.</p>
                    </div>
                    <div className="country">
                        <div className="text">
                            <p>Country</p>
                            {errors.country && <p className="errors">{errors.country}</p>}
                        </div>
                        <input className="userInput" type="text" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)}></input>
                    </div>
                    <div className="street">
                        <div className="text">
                            <p>Street Address</p>
                            {errors.address && <p className="errors">{errors.address}</p>}
                        </div>
                        <input className="userInput" type="text" placeholder="Street Address" value={address} onChange={e => setAddress(e.target.value)}></input>
                    </div>
                    <div className="city-state">
                        <div className="city">
                            <div className="text">
                                <p>City</p>
                                {errors.city && <p className="errors">{errors.city}</p>}
                            </div>
                            <input className="userInput" type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)}></input> ,
                        </div>
                        <div className="state">
                            <div className="text">
                                <p>State</p>
                                {errors.state && <p className="errors">{errors.state}</p>}
                            </div>
                            <input className="userInput" type="text" placeholder="State" value={state} onChange={e => setState(e.target.value)}></input>
                        </div>
                    </div>

                    <div className="lat-lng">
                        <div className="lat">
                            <div className="text">
                                <p>Latitude</p>
                                {errors.lat && <p className="errors">{errors.lat}</p>}
                            </div>
                            <input className="userInput" type="text" placeholder="Latitude" value={lat} onChange={e => setLat(e.target.value)}></input> ,
                        </div>
                        <div className="lng">
                            <div className="text">
                                <p>Longitude</p>
                                {errors.lng && <p className="errors">{errors.lng}</p>}
                            </div>
                            <input className="userInput" type="text" placeholder="Longitude" value={lng} onChange={e => setLng(e.target.value)}></input>
                        </div>
                    </div>
                </div>
                <div className="section2">
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea id="textArea" className="userInput" placeholder="Please write at least 30 characters" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    {errors.description && <p className="errors">{errors.description}</p>}
                </div>
                <div className="section3">
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests' attention with a spot title that highlights what makes
                        your place special.</p>
                    <input className="userInput" type="text" placeholder="Name of your spot" value={title} onChange={e => setTitle(e.target.value)}></input>
                    {errors.title && <p className="errors">{errors.title}</p>}
                </div>
                <div className="section4">
                    <div className="text"></div>
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher
                        in search results</p>
                    $ <input type="text" placeholder="Price per night (USD)" value={price} onChange={e => setPrice(e.target.value)}></input>
                    {errors.price && <p className="errors">{errors.price}</p>}
                </div>

                <button type="submit">Update your Spot</button>
            </form>
        </>
    )
}

export default UpdateSpot;
