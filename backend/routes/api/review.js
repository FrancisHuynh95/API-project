const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')


/*
Get all Reviews written by the current user
*/
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const getReviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']
                },
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                },

                include: { model: SpotImage }
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['reviewId', 'createdAt', 'updatedAt']
                }
            }

        ]
    })

    const getSpot = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })

    const newArr = [];
    getReviews.forEach(ele => {
        newArr.push(ele.toJSON())
    })
    newArr.forEach(ele => {
        ele.Spot.SpotImages.forEach(spot => {
            if (spot.preview) {
                ele.Spot.previewImage = spot.url
            }
        })
        if (!ele.Spot.previewImage) {
            newArr.Spot.previewImage = 'No preview image'
        }
        delete ele.Spot.SpotImages
    })

    const errorObj = {}
    const reviewObj = {}
    reviewObj.Reviews = getReviews

    if (getReviews.length === 0) {
        res.statusCode = 404
        errorObj.message = `Authentication required`
        errorObj.statusCode = res.statusCode
        return res.json(errorObj)
    }

    res.json({ review: newArr })
})

/*
Add an Image to a Review based on the Review's Id
*/

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const getId = req.params.reviewId;
    const { url } = req.body;

    const getReviewImg = await ReviewImage.findAll({
        where: { reviewId: getId }
    })

    const newArr = []
    getReviewImg.forEach(ele => {
        newArr.push(ele.toJSON())
    })
    if(!getReviewImg){
        res.statusCode = 404;
        res.json({
            message: `Review couldn't be found.`
        })
    }

    console.log(newArr)
    if(newArr.length > 10) {
        res.statusCode = 403;
       return res.json({
            message: "Maximum number of images for this resource was reached."
        })
    } else {

        const newImg = await ReviewImage.create({
            url,
            reviewId: getId
        })
        res.statusCode = 200;
        res.json(newImg)
    }
})




/*
Edit a review
*/
router.put('/:reviewId', requireAuth, async (req, res) => {
    const getId = req.params.reviewId;
    const { user } = req;
    const { review, stars } = req.body
    const getReview = await Review.findByPk(getId);

    let errorObj = {}
    if (!review) {
        errorObj.review = 'Review text is required'
    }

    // if(!stars || typeof stars !== 'integer' || stars < 1 || stars > 5){
    //      errorObj.stars = 'Stars must be an integer from 1 to 5'
    // }

    if (Object.keys(errorObj) > 0) {
        res.statusCode = 404;
        errorObj.statusCode = res.statusCode;
        return res.json(errorObj)
    }

    if (getReview.length === 0) {
        res.statusCode = 404;
        return res.json({
            message: `Review couldn't be found`
        })
    }

    getReview.review = review;
    getReview.stars = stars;

    await getReview.save()

    res.json(getReview)
})



/*
Delete a review
*/

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const getId = req.params.reviewId
    const getReview = await Review.findByPk(getId)

    if (!getReview) {
        res.statusCode = 404;
        res.json({
            message: `Review couldn't be found.`
        })
    }
    await getReview.destroy()
    res.statusCode = 200;
    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router
