const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

/*
Get all bookings of current user
*/

router.get('/current', requireAuth, async(req,res) => {
    const { user } = req;
    const getBookings = await Booking.findAll({
        where: {
            userId:1
        }
    })

    console.log(getBookings)
})



// })



/*
Edit a Booking
*/


/*
Delete a Booking
*/

/*
Delete a Spot Image
*/


/*
Delete a Review Image
*/

/*
Add Query Filters to Get All Spots

*/


module.exports = router;
