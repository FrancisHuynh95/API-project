const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')


/*
Delete a Review Image
*/

router.delete('/:imageId', requireAuth, async (req, res) => {
    const { user } = req;
    const getImageId = req.params.imageId
    const getImage = await ReviewImage.findByPk(getImageId)

    if (!getImage) {
        res.statusCode = 404;
        return res.json({
            message: `Review Image couldn't be found`
        })
    }

    const getReview = await Review.findByPk(getImageId)


    if (!getReview || getReview.userId !== user.id) {
        res.statusCode = 404;
        return res.json({
            message: `Authentication required`
        })
    }

    await getImage.destroy()
    res.statusCode = 200;
    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;
