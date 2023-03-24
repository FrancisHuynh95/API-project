const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
/*
Get all spots
------------------------------------------------------------------------------------------------------------
*/
router.get('/', async (req, res) => {
    const getAll = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage }
        ]
    })
    let newArr = []
    getAll.forEach(spot => {
        newArr.push(spot.toJSON())
    })

    /*
    For Spot Images
    */

    newArr.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview) {
                spot.previewImage = image.url
            }
        })

        if (!spot.previewImage) {
            spot.previewImage = 'No preview image found'
        }
        delete spot.SpotImages
    })

    /*
    For Spot Images
    -----------------------------------------------------------------------------------------------------
    For Reviews
    */
    newArr.forEach(spot => {
        // console.log(spot)
        const count = spot.Reviews.length
        let sum = 0;
        spot.Reviews.forEach(review => {
            sum += review.stars
            if (count) {
                spot.avgRating = sum / count
            }
        })
        if (!spot.avgRating) {
            spot.avgRating = 'No rating recorded'
        }
        delete spot.Reviews
    })

    res.statusCode = 200;
    res.json({ spots: newArr })
})


/*
 Get all Spots owned by the Current User
---------------------------------------------------------------------------------------------------------------
*/

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const userSpot = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        include:
            [
                { model: Review },
                { model: SpotImage }
            ]
    })

    let newArr = [];
    userSpot.forEach(spot => {
        newArr.push(spot.toJSON())
    })

    newArr.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview) {
                spot.previewImage = image.url
            }
        })

        if (!spot.previewImage) {
            spot.previewImage = 'No preview image found'
        }
        delete spot.SpotImages
    })

    newArr.forEach(spot => {
        // console.log(spot)
        const count = spot.Reviews.length
        let sum = 0;
        spot.Reviews.forEach(review => {
            sum += review.stars
            if (count) {
                spot.avgRating = sum / count
            }
        })
        if (!spot.avgRating) {
            spot.avgRating = 'No rating recorded'
        }
        delete spot.Reviews
    })
    res.statusCode = 200;
    res.json({ newArr })

})

/*
Get details of a spot from an id
---------------------------------------------------------------------------------------------------------------
*/
router.get('/:spotId', async (req, res, next) => {
    const getId = req.params.spotId
    const findSpot = await Spot.findAll({
        where: {
            id: getId
        },
        include: [
            { model: Review },
            { model: SpotImage },
            { model: User }
        ]
    })

    if (findSpot.length === 0) {
        res.statusCode = 404;
        const err = new Error(`Spot couldn't be found`)
        return next(err)
    }
    let newArr = [];
    let newArr2 = [];
    findSpot.forEach(spot => {
        newArr.push(spot.toJSON())
    })
    newArr.forEach(spot => {
        const count = spot.Reviews.length
        let sum = 0;
        spot.Reviews.forEach(review => {
            sum += review.stars
            if (count) {
                spot.avgStarRating = sum / count
                spot.numReviews = count
            }
        })
        if (!spot.avgStarRating) {
            spot.avgStarRating = 'No rating recorded'
            spot.numReviews = 0
        }
        delete spot.Reviews


        if (spot.SpotImages) {
            spot.SpotImages.forEach(image => {
                newArr2.push({
                    id: image.id,
                    url: image.url,
                    preview: image.preview
                })
            })
            spot.SpotImages = newArr2

            spot.Owner = {
                id: spot.User.id,
                firstName: spot.User.firstName,
                lastName: spot.User.lastName
            }
            delete (spot.User)
        }


    })
    res.statusCode = 200;
    res.json({ spots: newArr })


})


/*
CREATE A SPOT
--------------------------------------------------------------------------------------

*/

router.post('/', requireAuth, async (req, res, next) => {
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body

    const errorObj = {}

    if (!address) errorObj.address = `Street address is required`
    if (!city) errorObj.city = `City is required`
    if (!state) errorObj.state = 'State is required'
    if (!country) errorObj.country = `Country is required`
    if (!lat) errorObj.lat = `Latitude is not valid`
    if (!lng) errorObj.lng = `Longitude is not valid`
    if (name.length > 50) errorObj.name = `Name must be less than 50 characters`
    if (!description) errorObj.description = `Description is required`
    if (!price) errorObj.price = `Pricce per day is required`

    if (Object.keys(errorObj).length > 0) {
        errorObj.message = "Bad Request"
        res.statusCode = 400;
        return res.json(errorObj)
    }
    else {
        const { user } = req

        const newSpot = await Spot.create({
            address: address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            ownerId: user.id
        })
        res.json(newSpot)
    }
})
/*
Add an Image to a Spot based on the Spot's Id
-----------------------------------------------------------------------------------------------------------
*/

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const getSpotId = req.params.spotId
    const { url, preview } = req.body
    const newImage = await SpotImage.create({
        url,
        preview,
        spotId: getSpotId
    })
    const getNewImage = await SpotImage.findOne({
        where: {
            url: url
        },
        attributes: {
            exclude: ['spotId', 'createdAt', 'updatedAt']
        }
    })
    res.statusCode = 200;
    res.json(getNewImage)
})

/*
Edit a spot
----------------------------------------------------------------------------------------------------------------------
*/

router.put('/:spotId', requireAuth, async (req, res) => {
    const getSpotId = req.params.spotId
    const getSpot = await Spot.findByPk(getSpotId)
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    } = req.body

    const { user } = req

    const errorObj = {}


    if (!address) errorObj.address = 'Street address is required'
    if (!city) errorObj.city = 'City is required'
    if (!state) errorObj.state = 'State is required'
    if (!country) errorObj.country = 'Country is required'
    if (!lat) errorObj.lat = 'Latitude is not valid'
    if (!lng) errorObj.lng = 'Longitude is not valid'
    if (name.length >= 50) errorObj.name = 'Name must be less than 50 characters'
    if (!description) errorObj.description = 'Description is required'
    if (!price) errorObj.price = 'Price per day is required'

    if (getSpot.ownerId !== user.id) {
        res.statusCode = 404;
        errorObj.message = `Authentiation required`
        errorObj.statusCode = res.statusCode

        return res.json(errorObj)
    }

    if (Object.keys(errorObj).length) {
        res.statusCode = 400;
        errorObj.message = 'Bad Request'
        res.json(errorObj)
    }

    getSpot.address = address;
    getSpot.city = city;
    getSpot.state = state;
    getSpot.country = country;
    getSpot.lat = lat;
    getSpot.lng = lng;
    getSpot.name = name;
    getSpot.description = description;
    getSpot.price = price;

    await getSpot.save()

    const newGetSpot = getSpot.toJSON()
    delete newGetSpot.createdAt
    delete newGetSpot.updatedAt
    delete newGetSpot.id
    delete newGetSpot.ownerId

    res.statusCode = 200;
    res.json(newGetSpot)
})

/*
Delete a Spot
--------------------------------------------------------------------------------------------------------------------
*/

router.delete('/:spotId', requireAuth, async (req, res) => {
    const getSpotId = req.params.spotId
    const getSpot = await Spot.findByPk(getSpotId)
    const { user } = req;


    let errorObj = {}
    if (!getSpot) {
        res.statusCode = 404
        errorObj.message = `Spot couldn't be found`
        return res.json(errorObj)
    }

    if (user.id !== getSpot.ownerId) {
        res.statusCode = 404
        errorObj.message = `Authentication required`
        errorObj.statusCode = res.statusCode
        return res.json(errorObj)
    }
    res.statusCode = 200;

    await getSpot.destroy()
    res.json({
        message: "Successfully deleted"
    })
})

/*
Get all reviews by Spot Id
-------------------------------------------------------------------------------------------------------------------
*/

router.get('/:spotId/reviews', async (req, res) => {
    const getSpotId = req.params.spotId;
    const getReview = await Review.findAll({
        where: {
            spotId: getSpotId
        }, include: [
            {
                model: User,
                attributes: {
                    exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                }
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['reviewId', 'createdAt', 'updatedAt']
                }
            },
        ]
    })

    if (getReview.length === 0) {
        res.statusCode = 404;
        res.json({
            message: `Spot couldn't be found`
        })
    }
    res.json({ getReview })
})

/*
Create a review for a spot based on spot's id
*/

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const getSpotId = req.params.spotId;
    const getSpotIdInt = +getSpotId
    const { user } = req;
    const { review, stars } = req.body;
    const getReview = await Review.findAll({
        where:
            { userId: user.id }
    })

    const errorObj = {};
    const newArr = []
    getReview.forEach(ele => {
        newArr.push(ele.toJSON())
    })

    newArr.forEach(ele => {
        if (ele.spotId === getSpotIdInt) {
            errorObj.message = "User already has a review for this spot"
        }
    })

    if (Object.keys(errorObj).length > 0) {
        res.statusCode = 403;
        errorObj.statusCode = res.statusCode
        return res.json(errorObj)
    } else {

        if (!review) errorObj.review = 'Review text is required.'
        if (!stars || stars > 5 || stars < 1 || typeof stars !== "number") errorObj.stars = 'Stars must be an integer from 1 to 5'


        if (Object.keys(errorObj).length > 0) {
            res.statusCode = 404;
            errorObj.statusCode = res.statusCode;
            return res.json(errorObj)
        }
        const newReview = await Review.create({
            review: review,
            stars: stars,
            spotId: +getSpotId,
            userId: +user.id
        })
        res.statusCode = 200;
        res.json(newReview)
    }
})

/*
get all booking for a spot based on the spot id
*/

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const getId = req.params.spotId;
    const { user } = req
    const getSpot = await Spot.findAll({
        where: {
            Id: getId
        }
    })
    let getBooking

    if (!getSpot) {
        let errorObj = {}
        res.statusCode = 404;
        errorObj.statusCode = 404;
        errorObj.message = `Spot couldn't be found`
        return errorObj;
    }

    const newArr = []
    getSpot.forEach(spot => {
        newArr.push(spot.toJSON())
    })
    const id = parseInt(getId)
    if (newArr[0].ownerId !== id) {
        getBooking = await Booking.findAll({
            where: {
                spotId: id,
                attributes: {
                    exclude: ['id', 'userId', 'createdAt', 'updatedAt']
                }
            }
        })
    }
    else {
        getBooking = await Booking.findAll({
            where: {
                spotId: id
            }, include: {
                model: User,
                attributes: {
                    exclude: ['username', 'hashedPassword', 'createdAt', 'updatedAt', 'email']
                }
            }
        })
    }

    res.statusCode = 200
    res.json({ "Bookings": getBooking })
})

/*
Create a Booking from a Spot based on the Spot's id
*/

router.post('/:spotId/bookings', requireAuth, async(req,res) => {
    const { user } = req;
    const getSpotId = req.params.spotId;
    const findBooking = await Booking.findAll({where: {
        spotId: getSpotId}
    })

    const newArr = [];
    findBooking.forEach(booking => {
        newArr.push(booking.toJSON())
    })

    newArr.forEach(ele => {
        console.log(typeof ele.startDate)
    })

})
module.exports = router;
