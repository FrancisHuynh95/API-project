import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createSpotThunk } from "../../store/spots";
import './createSpot.css'
import { useHistory } from "react-router-dom";



function CreateSpot() {
const [country, setCountry] = useState('')
const [address, setAddress] = useState('')
const [city, setCity] = useState('')
const [state, setState] = useState('')
const [lng, setLng] = useState('')
const [lat, setLat] = useState('')
const [description, setDescription] = useState('')
const [title, setTitle] = useState('')
const [price, setPrice] = useState('')
const [previewURL, setPreviewURL] = useState('')
const [url, setURL] = useState('')
const [url2, setURL2] = useState('')
const [url3, setURL3] = useState('')
const [url4, setURL4] = useState('')
const [errors, setErrors] = useState({})
const dispatch = useDispatch()
const history = useHistory()


async function formSubmit(e) {
    e.preventDefault()
    const errorObj = {}
    if(country.length === 0) errorObj.country = "Country is required"
    if(address.length === 0) errorObj.address = "Address is required"
    if(city.length === 0) errorObj.city = "City is required"
    if(state.length === 0) errorObj.state = "State is required"
    if(lng.length === 0) errorObj.lng = "Lng is required"
    if(lat.length === 0) errorObj.lat = "Lat is required"
    if(description.length < 30) errorObj.description = "Description needs a minimum of 30 characters"
    if(title.length === 0) errorObj.title = "Name is required"
    if(price.length === 0) errorObj.price = "Price is required"
    if(previewURL.length === 0) errorObj.previewURL = "Preview URL is required"
    if(previewURL && previewURL.slice(previewURL.length -4, previewURL.length) !== '.png' && previewURL.slice(previewURL.length -4, previewURL.length) !== '.jpg' && previewURL.slice(previewURL.length -5, previewURL.length) !== '.jpeg') errorObj.previewURLPNG = 'Image must end in .png, .jpg, or .jpeg'

    if(url && url.slice(url.length -4, url.length) !== '.png' && url.slice(url.length -4, url.length) !== '.jpg' && url.slice(url.length -5, url.length) !== '.jpeg') errorObj.urlPNG = 'Image URL must end in .png, .jpg, or .jpeg'
    if(url2 && url2.slice(url2.length -4, url2.length) !== '.png' && url2.slice(url2.length -4, url2.length) !== '.jpg' && url2.slice(url2.length -5, url2.length) !== '.jpeg') errorObj.urlPNG2 = 'Image URL must end in .png, .jpg, or .jpeg'
    if(url3 && url3.slice(url3.length -4, url3.length) !== '.png' && url3.slice(url3.length -4, url3.length) !== '.jpg' && url3.slice(url3.length -5, url3.length) !== '.jpeg') errorObj.urlPNG3 = 'Image URL must end in .png, .jpg, or .jpeg'
    if(url4 && url4.slice(url4.length -4, url4.length) !== '.png' && url4.slice(url4.length -4, url4.length) !== '.jpg' && url4.slice(url4.length -5, url4.length) !== '.jpeg') errorObj.urlPNG4 = 'Image URL must end in .png, .jpg, or .jpeg'

    setErrors(errorObj)
    if(Object.keys(errors).length === 0){
    const newArr = [];
    if(previewURL){
        newArr.push({url: previewURL, preview: true})
    }

    if(url){
        newArr.push({url: url, preview: false})
    }
    if(url2){
        newArr.push({url: url2, preview: false})
    }
    if(url3){
        newArr.push({url: url3, preview: false})
    }
    if(url4){
        newArr.push({url: url4, preview: false})
    }


        let spot = await dispatch(createSpotThunk({country, address, city, state, lng, lat, description, name: title, price}, newArr))
        history.push(`/spots/${spot.id}`)
    }
}

    const user = useSelector(state => state.session.user)


    return (
        <>
            <form onSubmit={formSubmit}>
                <div className="section1">
                    <div className="topMsg">
                        <h2>Create a new Spot</h2>
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
                            <input className="userInput" type="text" placeholder="State" value={state} onChange={e =>setState(e.target.value)}></input>
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
                <div className="section5">
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                     <input value={previewURL} onChange={e => setPreviewURL(e.target.value)} className="userInput" id="previewImage" type="text" placeholder="Preview Image URL"></input>
                     {errors.previewURL && <p className="errors">{errors.previewURL}</p>}
                     <input value={url} onChange={e => setURL(e.target.value)}  className="userInput" id="imageURL1" type="text" placeholder="Image URL"></input>
                     {errors.urlPNG && <p className="errors">{errors.urlPNG}</p>}
                     <input value={url2} onChange={e => setURL2(e.target.value)}  className="userInput" id="imageURL2" type="text" placeholder="Image URL"></input>
                     {errors.urlPNG2 && <p className="errors">{errors.urlPNG2}</p>}
                     <input value={url3} onChange={e => setURL3(e.target.value)}  className="userInput" id="imageURL3" type="text" placeholder="Image URL"></input>
                     {errors.urlPNG3 && <p className="errors">{errors.urlPNG3}</p>}
                     <input value={url4} onChange={e => setURL4(e.target.value)}  className="userInput" id="imageURL4" type="text" placeholder="Image URL"></input>
                     {errors.urlPNG4 && <p className="errors">{errors.urlPNG4}</p>}
                </div>
                <button type="submit">Create Spot</button>
            </form>
        </>
    )
}

export default CreateSpot;
