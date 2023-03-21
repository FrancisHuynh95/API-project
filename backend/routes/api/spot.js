const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User } = require('../../db/models');

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
    res.json({spots: newArr})
})


/*
Get details of a spot from an id
---------------------------------------------------------------------------------------------------------------
*/
router.get('/:spotId', async (req,res) => {
    const getId = req.params.spotId
    const findSpot = await Spot.findAll({
        where:{
            id:getId
        },
        include: [
            { model: Review },
            { model: SpotImage }
        ]
    })

    let newArr = []
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
    })

    res.statusCode = 200;
    res.json({spots: newArr})

})


module.exports = router;
