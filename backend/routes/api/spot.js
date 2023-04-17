const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize')
/*
Get all spots
------------------------------------------------------------------------------------------------------------
*/
router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
    let where = {}
    let queryErrors = { errors: {} }
    if (!page) page = 1
    if (!size) size = 20

    page = +page
    size = +size
    minLat = +minLat
    maxLat = +maxLat
    minLng = +minLng
    maxLng = +maxLng
    minPrice = +minPrice
    maxPrice = +maxPrice


    if (page < 1 || isNaN(page)) {
        queryErrors.errors.page = "Page must be greater than or equal to 1"
    }
    if (size < 1 || isNaN(size)) {
        queryErrors.errors.size = "Size must be greater than or equal to 1"
    }
    if (minLat) {
        if (minLat < -90 || isNaN(minLat)) {
            queryErrors.errors.minLat = "Minimum latitude is invalid"
        } else {
            where.lat = { [Op.gte]: minLat }
        }
    }
    if (maxLat) {
        if (maxLat > 90 || maxLat || isNaN(maxLat)) {
            queryErrors.errors.maxLat = "Maximum latitude is invalid"
        } else {
            where.lat = { [Op.lte]: +maxLat }
        }
    }
    if (minLng) {
        if (minLng < -180 || isNaN(minLng)) {
            queryErrors.errors.minLng = "Minimum longitude is invalid"
        } else {
            where.lng = { [Op.gte]: +minLng }
        }
    }
    if (maxLng) {
        if (maxLng > 180 || maxLng || isNaN(maxLng)) {
            queryErrors.errors.maxLng = "Maximum longitude is invalid"
        } else {
            where.lng = { [Op.lte]: +maxLng }
        }
    }
    if (minPrice) {
        if (minPrice < 0 || minPrice || isNaN(minPrice)) {
            queryErrors.errors.minPrice = "Minimum price must be greater than or equal to 0"
        } else {
            where.price = { [Op.gte]: +minPrice }
        }
    }
    if (maxPrice) {
        if (maxPrice < 0 || maxPrice || isNaN(maxPrice)) {
            queryErrors.errors.maxPrice = "Maximum price must be greater than or equal to 0"
        } else {
            where.price = { [Op.lte]: maxPrice }
        }
    }
    if (Object.keys(queryErrors.errors).length > 0) {
        res.statusCode = 400;
        queryErrors.message = `Bad Request`;
        return res.json(queryErrors)
    }
    let limit = size
    let offset = size * (page - 1)
<<<<<<< HEAD

=======
>>>>>>> frontend

    const getAll = await Spot.findAll({
        where,
        include: [
            { model: Review },
            { model: SpotImage }
        ],
        limit: limit,
        offset: offset
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

        const count = spot.Reviews.length
        let sum = 0;
        spot.Reviews.forEach(review => {
            sum += review.stars
            if (count) {
                spot.avgRating = (sum / count).toFixed(1)
            }
        })
        if (!spot.avgRating) {
            spot.avgRating = 'No rating recorded'
        }
        delete spot.Reviews
    })

    res.statusCode = 200;
    res.json({ Spots: newArr, page, size })
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

    if (userSpot.length === 0) {
        res.statusCode = 200;
        res.json({
            message: `User doesn't have spots.`
        })
    }

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

    newArr.forEach(spot1 => {
        const count = spot1.Reviews.length
        let sum = 0;
        spot1.Reviews.forEach(review => {
            sum += review.stars
            if (count) {
                spot1.avgRating = (sum / count).toFixed(1)
            }
        })
        if (!spot1.avgRating) {
            spot1.avgRating = 'No rating recorded'
        }
        delete spot1.Reviews
    })
    let newSpot = {Spot: newArr}

    res.statusCode = 200;
    res.json(newSpot)

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
        res.json({
            message: `Spot couldn't be found`
        })
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
                spot.avgStarRating = (sum / count).toFixed(1)
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
            if (newArr2.length === 0) {
                spot.SpotImages = `Spot doesn't have any images`
            } else {
                spot.SpotImages = newArr2
            }

            spot.Owner = {
                id: spot.User.id,
                firstName: spot.User.firstName,
                lastName: spot.User.lastName
            }
            delete (spot.User)
        }

    })
    res.statusCode = 200;
    res.json(...newArr)

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

    if(Object.keys(req.body).length === 0){
        res.statusCode = 400;
        return res.json({
            title: "Bad Request",
            message: "Nothing has been inputted"
        })
    }

    const errorObj = { errors: {} }

    if (!address) errorObj.errors.address = `Street address is required`
    if (!city) errorObj.errors.city = `City is required`
    if (!state) errorObj.errors.state = 'State is required'
    if (!country) errorObj.errors.country = `Country is required`
    if (!lat) errorObj.errors.lat = `Latitude is not valid`
    if (!lng) errorObj.errors.lng = `Longitude is not valid`
    if (name.length >= 50) errorObj.errors.name = `Name must be less than 50 characters`
    if (!description) errorObj.errors.description = `Description is required`
    if (!price) errorObj.errors.price = `Price per day is required`

    if (Object.keys(errorObj.errors).length > 0) {
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
        res.statusCode = 201;
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
    const { user } = req;
    const getSpot = await Spot.findByPk(getSpotId)

    if(Object.keys(req.body).length === 0){
        res.statusCode = 400;
        res.json({
            title: "Bad Request",
            message: "No input has been added"
        })
    }

    if (!getSpot) {
        res.statusCode = 404;
        return res.json({
            message: `Spot couldn't be found`
        })
    }
    if (getSpot.ownerId !== user.id) {
        res.statusCode = 403;
        res.json({
            message: "Forbidden"
        })
    }
    const newImage = await SpotImage.create({
        url,
        preview,
        spotId: getSpotId
    })

    let newImage2 = {}
    newImage2.url = newImage.url;
    newImage2.preview = newImage.preview;
    newImage2.id = newImage.id


    res.statusCode = 200;
    res.json(newImage2)
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
    const errorObj = { errors: {} }
    const errorObj2 = {}
    //edit a spot couldnt find a spot with id
    if (!getSpot) {
        res.statusCode = 404;
        return res.json({
            message: `Spot couldn't be found`
        })
    }

    if (getSpot.ownerId !== user.id) {
        res.statusCode = 403;
        errorObj.message = `Forbidden`
        return res.json(errorObj2)
    }
    if (!address) errorObj.errors.address = 'Street address is required'
    if (!city) errorObj.errors.city = 'City is required'
    if (!state) errorObj.errors.state = 'State is required'
    if (!country) errorObj.errors.country = 'Country is required'
    if (!lat || +lat > 90 || +lat < -90 ) errorObj.errors.lat = 'Latitude is not valid'
    if (!lng || +lng > 180 || +lng < -180) errorObj.errors.lng = 'Longitude is not valid'
    if (name.length >= 50) errorObj.errors.name = 'Name must be less than 50 characters'
    if (!description) errorObj.errors.description = 'Description is required'
    if (!price) errorObj.errors.price = 'Price per day is required'


    if (Object.keys(errorObj.errors).length) {
        res.statusCode = 400;
        errorObj.title = 'Bad Request'
        errorObj.message = "Nothing has been inputted"
        return res.json(errorObj)
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
        res.statusCode = 403
        errorObj.message = `Forbidden`
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
    const getSpot = await Spot.findOne({
        where: {
            id: getSpotId
        },
        include: [
            {
                model: Review, include: [
                    { model: ReviewImage },
                    { model: User }
                ]
            }
        ]
    })
    if (!getSpot) {
        res.statusCode = 404;
        return res.json({
            message: `Spot couldn't be found`
        })
    }
    if (!getSpot.Reviews.length) {
        res.statusCode = 200;
        return res.json({
            message: `Spot doesn't have any reviews`
        })
    }

    if (getSpot.Reviews.ReviewImages) {
        getSpot.Reviews.ReviewImages = `Spot doesn't have any review images`
    }
    let newSpot = getSpot.toJSON()
    let reviews = []
    for (let review of newSpot.Reviews) {
        if (review.ReviewImages) {
            review.ReviewImages.forEach(image => {
                delete image.createdAt
                delete image.updatedAt
                delete image.reviewId
            })
        }
        if (review.ReviewImages.length === 0) {
            review.ReviewImages = `Review doesn't have images`
        }
        delete review.User.username
        reviews.push(review)
    }

    return res.json({Reviews: reviews})
})

/*
Create a review for a spot based on spot's id
*/

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const getSpotId = req.params.spotId;
    const getSpotIdInt = +getSpotId
    const { user } = req;
    const { review, stars } = req.body;
    if(Object.keys(req.body).length === 0){
        res.statusCode = 400;
        return res.json({
            title: "Bad request",
            message: "Must have an input for review and stars"
        })
    }
    const getReview = await Review.findAll({
        where:
            { userId: user.id }
    })
    const getSpot = await Spot.findByPk(getSpotId)
    if (!getSpot) {
        res.statusCode = 404;
        return res.json({
            message: `Spot couldn't be found`
        })
    }

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

    if ((errorObj.message)) {
        res.statusCode = 403;
        return res.json(errorObj)

    } else {
        let newErrorObj = { errors: {} }
        if (!review) newErrorObj.errors.review = 'Review text is required.'
        if (!stars || stars > 5 || stars < 1 || typeof stars !== "number") newErrorObj.errors.stars = 'Stars must be an integer from 1 to 5'


        if (Object.keys(errorObj).length > 0) {
            res.statusCode = 404;
            errorObj.statusCode = res.statusCode;
            return res.json(errorObj)
        }
        if (Object.keys(newErrorObj.errors).length > 0) {
            res.statusCode = 400;
            res.json(newErrorObj)
        }
        const newReview = await Review.create({
            review: review,
            stars: stars,
            spotId: +getSpotId,
            userId: +user.id
        })
        res.statusCode = 201;
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
            id: getId
        }
    })
    let getBooking


    if (getSpot.length === 0) {
        let errorObj = {}
        res.statusCode = 404;
        errorObj.message = `Spot couldn't be found`
        return res.json(errorObj);
    }

    const newArr = []
    getSpot.forEach(spot => {
        newArr.push(spot.toJSON())
    })

    const id = parseInt(getId)
    if (newArr[0].ownerId !== user.id) {
        getBooking = await Booking.findAll({
            where: {
                spotId: id,
            },
            attributes: {
                exclude: ['id', 'userId', 'createdAt', 'updatedAt']
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
    if (getBooking.length === 0) {
        res.json({
            message: `No bookings found`
        })
    }

    res.statusCode = 200
    res.json({ "Bookings": getBooking })
})

/*
Create a Booking from a Spot based on the Spot's id
*/

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req;
    const getSpotId = req.params.spotId;
    const { startDate, endDate } = req.body
    if(Object.keys(req.body).length === 0){
        res.statusCode = 400;
        return res.json( {
            title: "Bad Request",
            message : "Must have an input for startDate and endDate"
        })
    }
    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)
    const startDateTime = newStartDate.getTime()
    const endDateTime = newEndDate.getTime()
    const getSpot = await Spot.findByPk(getSpotId)
    const today = new Date()
    const todayTime = today.getTime()


    let test = (new Date(today).toISOString().split('T'))
    let time = (new Date(today).toTimeString().split(' '))


    const theUserId = user.id


    const findBooking = await Booking.findAll({
        where: {
            spotId: getSpotId
        }
    })

    const findSpot = await Spot.findAll({
        where: {
            id: getSpotId
        }
    })


    const newArr = [];
    findBooking.forEach(booking => {
        newArr.push(booking.toJSON())
    })
    let bookedStartDate
    let bookedStartDateTime
    let bookedEndDate
    let bookedEndDateTime
    let errorObjConflicts = { errors: {} }

    //spot must not belong to the current user
    if (endDateTime <= startDateTime) {
        res.statusCode = 400;
        return res.json({
            message: `Bad Request`,
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        }
        )
    }

    if (findSpot.length === 0) {
        res.statusCode = 404;
        return res.json({
            message: `Spot couldn't be found`
        })
    }
    if (user.id === getSpot.ownerId) {
        res.statusCode = 403;
        res.json({
            message: "Owner cannot create a booking for their own spot"
        })
    }


    newArr.forEach(ele => {
        bookedStartDate = new Date(ele.startDate)
        bookedStartDateTime = bookedStartDate.getTime()
        bookedEndDate = new Date(ele.endDate)
        bookedEndDateTime = bookedEndDate.getTime()


        if (startDateTime < bookedStartDateTime && endDateTime > bookedStartDateTime) {
            errorObjConflicts.message = `Sorry, this spot is already booked for the specified dates`
            errorObjConflicts.errors.endDate = "End date conflicts with an existing booking"
        }
        if (startDateTime > bookedStartDateTime && startDateTime < bookedEndDateTime) {
            errorObjConflicts.message = `Sorry, this spot is already booked for the specified dates`;
            errorObjConflicts.errors.startDate = `Start date conflicts with an existing booking`
        }

        if (bookedStartDateTime > startDateTime && endDateTime > bookedEndDateTime) {
            errorObjConflicts.message = `Sorry, this spot is already booked for the specified dates`;
            errorObjConflicts.errors.startDate = `Start date conflicts with an existing booking`
            errorObjConflicts.errors.endDate = "End date conflicts with an existing booking"
        }
        if (bookedStartDateTime === startDateTime && endDateTime === bookedEndDateTime) {
            errorObjConflicts.message = `Sorry, this spot is already booked for the specified dates`;
            errorObjConflicts.errors.startDate = `Start date conflicts with an existing booking`
            errorObjConflicts.errors.endDate = "End date conflicts with an existing booking"
        }
        if (startDateTime < todayTime || todayTime > endDateTime) {
            errorObjConflicts.errors.message = `Sorry, you can't book for a time in the past`
        }

    })
    if (Object.keys(errorObjConflicts.errors).length > 0) {
        res.statusCode = 403;
        return res.json(errorObjConflicts)
    }
    const newBooking = await Booking.create({
        startDate: startDate,
        endDate: endDate,
        spotId: getSpotId,
        userId: theUserId
    })


    const newBooking2 = {}
    newBooking2.id = newBooking.id
    newBooking2.spotId = newBooking.spotId
    newBooking2.userId = newBooking.userId
    newBooking2.startDate = startDate
    newBooking2.endDate = endDate
    newBooking2.createdAt = `${test[0]} ${time[0]}`
    newBooking2.updatedAt = `${test[0]} ${time[0]}`

    res.statusCode = 200;
    res.json(newBooking2)

})



module.exports = router;
