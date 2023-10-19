const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

/*
Get all bookings of current user
*/

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const getBookings = await Booking.findAll({
        where: {
            userId: user.id
        }, include: [
            {model: Spot, include: {model: SpotImage},attributes: {
                exclude: ['createdAt', 'updatedAt', 'description']
            }},
        ]
    })

    let newArr = []
    getBookings.forEach(booking => {
        newArr.push(booking.toJSON())
    })

    newArr.forEach(ele => {
       ele.Spot.SpotImages.forEach(image => {
            if(image.preview === true){
                ele.Spot.previewImage = image.url
            }
       })
       if(!ele.Spot.previewImage){
        ele.Spot.previewImage = `No images found`
    }
    delete ele.Spot.SpotImages
    })

    if (getBookings.length === 0) {
        res.statusCode = 200;
        res.json({
            message: `There are no bookings`
        })
    }
    res.json({Bookings: newArr})
})

/*
Edit a Booking
*/
router.put('/:bookingId', requireAuth, async (req, res) => {
    // console.log('req body \n\n\n\n\n', req.body)
    const { startDate, endDate, spotId } = req.body;
    const { user } = req;
    const getBookingId = req.params.bookingId
    const getBooking = await Booking.findByPk(getBookingId)
    const allBookings = await Booking.findAll({where: {
        spotId : spotId
    }})


    // const startDateTime = new Date(startDate).getTime()
    // const endDateTime = new Date(endDate).getTime()
    const today = new Date().getTime()
    const start1 = new Date(0)
    const end1 = new Date(0)
    const startFormat1 = startDate.split('-')
    const endFormat1 = endDate.split('-')
    // const startFormat = startFormat1.split('-')
    // const endFormat = endFormat1.split("-")

    start1.setFullYear(+startFormat1[0])
    start1.setMonth(+startFormat1[1]-1)
    start1.setDate(+startFormat1[2])
    start1.setHours(0)
    end1.setHours(0)
    end1.setFullYear(+endFormat1[0])
    end1.setMonth(+endFormat1[1]-1)
    end1.setDate(+endFormat1[2])

    const startDateTime = start1.getTime()
    const endDateTime = end1.getTime()


    if (!getBooking) {
        res.statusCode = 404;
        return res.json({
            message: `Booking couldn't be found`
        })
    }

    if (user.id !== getBooking.userId) {
        res.statusCode = 404;
        return res.json({
            message: 'Authentication Error'
        })
    }
    if (today > startDateTime + 54000000) {
        res.statusCode = 403;
        return res.json({
            message: `Past bookings can't be modified`
        })
    }
    if (today > endDateTime + 54000000) {
        res.statusCode = 403;
        return res.json({
            message: `Can't set your end date in the past`
        })
    }


    if (endDateTime + 54000000 < startDateTime + 54000000) {
        res.statusCode = 400;
        return res.json({
            message: "endDate cannot come before startDate"
        })
    }

    let bookedStartDate
    let bookedStartDateTime
    let bookedEndDate
    let bookedEndDateTime


    function checkValidDate(startDateTime, endDateTime, bookedStartDateTime, bookedEndDateTime){

        if (startDateTime + 54000000 <= bookedStartDateTime && endDateTime + 54000000 >= bookedStartDateTime) {
            return {message: "Sorry, this spot is already booked for the specified dates",
                    errors: {endDate: "End date conflicts with an existing booking"}}
        }
        if (startDateTime + 54000000 >= bookedStartDateTime && startDateTime + 54000000 <= bookedEndDateTime) {
            return {message: "Sorry, this spot is already booked for the specified dates",
                    errors: {startDate: "Start date conflicts with an existing booking"}}
        }

        if (bookedStartDateTime >= startDateTime + 54000000 && endDateTime + 54000000 >= bookedEndDateTime) {
            return {message: "Sorry, this spot is already booked for the specified dates",
            errors: {endDate: "End date conflicts with an existing booking",
                     startDate: "Start date conflicts with an existing booking"}}
        }
        return {}


    }
    let check = {}
    allBookings?.forEach(getBooking => {
        bookedStartDate = new Date(getBooking.startDate)
        bookedStartDate.setHours(15)
        bookedStartDateTime = bookedStartDate.getTime()
        bookedEndDate = new Date(getBooking.endDate)
        bookedEndDate.setHours(15)
        bookedEndDateTime = bookedEndDate.getTime()

        let isCheck = checkValidDate(startDateTime, endDateTime, bookedStartDate, bookedEndDate)
        if(Object.values(isCheck).length){
            check = isCheck
            return
        }
    })
    if (Object.keys(check).length > 0) {
        res.statusCode = 403;
        return res.json(check)
    }

        const newBooking = await getBooking.update({
            startDate: startDate,
            endDate: endDate
    })
    res.json(newBooking)
})

/*
Delete a Booking
*/
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const getBookingId = req.params.bookingId;
    const { user } = req;
    const getBooking = await Booking.findByPk(getBookingId)
    const newToday = new Date()
    const today = newToday.getTime()

    if (!getBooking) {
        res.statusCode = 404;
        return res.json({
            message: `Booking couldn't be found`
        })
    }
    //'2023-10-18'
    const start1 = new Date(getBooking.startDate)
    const startFormat1 = getBooking.startDate.toISOString().split('T')[0]
    const startFormat = startFormat1.split('-')
    const endFormat1 = getBooking.endDate.toISOString().split('T')[0]
    const endFormat = endFormat1.split("-")
    const end1 = new Date(getBooking.endDate)
    start1.setFullYear(+startFormat[0])
    start1.setMonth(+startFormat[1]-1)
    start1.setDate(+startFormat[2])
    start1.setHours(0)
    end1.setHours(0)
    end1.setFullYear(+endFormat[0])
    end1.setMonth(+endFormat[1]-1)
    end1.setDate(+endFormat[2])
    const start = start1.getTime()
    const end = end1.getTime()

    const getSpot = await Spot.findAll({ where: { ownerId: user.id } })


    if (today >= parseInt(start) + 54000000 && today <= parseInt(end) + 54000000) {
        res.statusCode = 403;
        return res.json({
            message: `Bookings that have been started can't be deleted`
        })
    }

    if (user.id !== getBooking.userId) {
        if (user.id === getSpot.ownerId) {
            await getBooking.destroy();
            res.statusCode = 200;
            return res.json({
                message: `Successfully deleted`
            })

        }
    }
    else if (user.id !== getSpot.ownerId) {
        if (user.id === getBooking.userId) {
            await getBooking.destroy();
            res.statusCode = 200;
            return res.json({
                message: `Successfully deleted`
            })
        }
    }
    else {
        res.statusCode = 403;
        return res.json({
            message: `Forbidden`
        })
    }
})



/*
Add Query Filters to Get All Spots

*/


module.exports = router;
