const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')


/*
Get all Reviews written by the current user
broken on render might be bugged.. new user doesn't work, seeder user works
*/
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    if(!user){
        res.statusCode = 401;
        return res.json({
            message: `Authentication required`
        })
    }
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
            if (spot.preview === true) {
                ele.Spot.previewImage = spot.url
            }
        })
        if (!ele.Spot.previewImage) {
            ele.Spot.previewImage = 'No preview image'
        }
        if(Object.values(ele.ReviewImages).length === 0){
            ele.ReviewImages = "No Images Found"
        }
        delete ele.Spot.SpotImages
    })

    const errorObj = {}
    const reviewObj = {}
    reviewObj.Reviews = getReviews


    if (getReviews.length === 0) {
        res.statusCode = 200
        return res.json({
            message: "User has no reviews"
        })
    }

    res.json({ Reviews: newArr })
})

/*
Add an Image to a Review based on the Review's Id
*/

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const getId = req.params.reviewId;
    const { url } = req.body;
    const { user } = req;

    const getReviewImg = await ReviewImage.findAll({
        where: { reviewId: getId }
    })

    const getReview = await Review.findByPk(getId)

    if(!getReview){
        res.statusCode = 404;
        return res.json({
            message: `Review couldn't be found.`
        })
    }

    if (getReview.userId !== user.id) {
        res.statusCode = 404;
        return res.json({
            message: "Authentication required"
        })
    }

    const newArr = []
    getReviewImg.forEach(ele => {
        newArr.push(ele.toJSON())
    })
    if (!getReviewImg) {
        res.statusCode = 404;
        res.json({
            message: `Review couldn't be found.`
        })
    }
    if (newArr.length > 10) {
        res.statusCode = 403;
        return res.json({
            message: "Maximum number of images for this resource was reached."
        })
    } else {

        const newImg = await ReviewImage.create({
            url,
            reviewId: getId
        })

        newImgContainer = {
            id: newImg.id,
            url: newImg.url
        }

        res.statusCode = 200;
        res.json(newImgContainer)
    }
})




/*
Edit a review
*/
router.put('/:reviewId', requireAuth, async (req, res) => {
    const getId = req.params.reviewId;
    const { user } = req;
    const { review, stars } = req.body
    const getReview = await Review.findByPk(getId)


    if (!getReview) {
        res.statusCode = 404;
        return res.json({
            message: `Review couldn't be found`
        })
    }

    if (user.id !== getReview.userId) {
        res.statusCode = 404;
        return res.json({
            message: "Authentication required"
        })
    }

    let newErrorObj = {errors: {}}
    if (stars < 1 || stars > 5) {
        newErrorObj.errors.stars = "Stars must be an integer from 1 to 5"
    }

    if (review.length === 0) {
        newErrorObj.errors.review = "Review text is required"
    }

    if (Object.keys(newErrorObj.errors).length > 0) {
        res.statusCode = 400;
        newErrorObj.message = "Bad Request"
        return res.json(newErrorObj)
    }

    getReview.review = review;
    getReview.stars = stars;

    const savedReview = await getReview.update({
        review,
        stars
    })

    res.json(savedReview)
})

/*
Delete a review
*/

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req
    const getId = req.params.reviewId
    const getReview = await Review.findByPk(getId)

    if (!getReview) {
        res.statusCode = 404;
        return res.json({
            message: `Review couldn't be found.`
        })
    }

    if (user.id !== getReview.userId) {
        res.statusCode = 404;
        return res.json({
            message: "Authentication required"
        })
    }
    await getReview.destroy()
    res.statusCode = 200;
    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router
