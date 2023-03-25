const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')


router.delete('/:imageId', requireAuth, async (req, res) => {
    const { user } = req;
    const getImageId = req.params.imageId
    const getImage = await SpotImage.findByPk(getImageId)
    const getSpot = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })

    if (getSpot.length === 0) {
        res.statusCode = 404;
        return res.json({
            message: "Authentication required"
        })
    }

    if (!getImage) {
        res.statusCode = 404;
        return res.json({
            message: `Spot Image couldn't be found`
        })
    }

    await getImage.destroy()
    res.statusCode = 200;
    res.json({
        message: "Successfully"
    })

})








module.exports = router
