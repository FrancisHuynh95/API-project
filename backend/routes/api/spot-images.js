const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')


router.delete('/:imageId', requireAuth, async (req, res) => {
    const getImageId = req.params.imageId;
    const { user } = req;
    const getImage = await SpotImage.findByPk(getImageId)

    if(!getImage){
        res.statusCode = 404;
        return res.json({
            message: `Spot Image couldn't be found`
        })
    }

    const getSpot = await Spot.findByPk(getImage.spotId)

    if(user.id !== getSpot.ownerId){
        res.statusCode = 403;
        return res.json({
            message: `Forbidden`
        })
    }

    await getImage.destroy()
    res.statusCode = 200;
    res.json({
        message: "Successfully deleted"
    })

})



module.exports = router
