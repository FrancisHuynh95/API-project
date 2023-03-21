const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User } = require('../../db/models');


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
    */

    /*
    For Reviews
    */
    newArr.forEach(spot => {
        console.log('SPOT LOOP')
        spot.Reviews.forEach(review => {
            let length = (spot.Reviews.length)
            let sum = 0;
            console.log('review loop', length, sum+= review.stars)
            // console.log(review.stars)
        })
    })

    /*
    For Reviews
    */

    res.statusCode = 200;
    res.json(newArr)
})



module.exports = router;
