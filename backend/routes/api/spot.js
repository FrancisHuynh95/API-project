const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User } = require('../../db/models');
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
    res.json(newArr)

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

router.post('/', requireAuth, async (req,res) => {
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

    const {user} = req

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

    const newSpot2 = await Spot.findByPk(user.id, {
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'id', 'ownerId']
        }
    })
    console.log(newSpot2)

    res.json(newSpot2)

})

module.exports = router;
