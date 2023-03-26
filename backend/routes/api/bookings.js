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
        }
    })
    if (getBookings.length === 0) {
        res.statusCode = 200;
        res.json({
            message: `There are no bookings`
        })
    }
    res.json(getBookings)
})

/*
Edit a Booking
*/
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { user } = req;
    const getBookingId = req.params.bookingId
    const getBooking = await Booking.findByPk(getBookingId)

    const startDateTime = new Date(startDate).getTime()
    const endDateTime = new Date(endDate).getTime()
    const today = new Date().getTime()


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
    if (today > startDateTime) {
        res.statusCode = 403;
        return res.json({
            message: `Past bookings can't be modified`
        })
    }
    if (today > endDateTime) {
        res.statusCode = 403;
        return res.json({
            message: `Can't set your end date in the past`
        })
    }


    if (endDateTime < startDateTime) {
        res.statusCode = 400;
        return res.json({
            message: "endDate cannot come before startDate"
        })
    }

    let bookedStartDate
    let bookedStartDateTime
    let bookedEndDate
    let bookedEndDateTime

    let errorObjConflicts = {}

    bookedStartDate = new Date(getBooking.startDate)
    bookedStartDateTime = bookedStartDate.getTime()
    bookedEndDate = new Date(getBooking.endDate)
    bookedEndDateTime = bookedEndDate.getTime()

    if (startDateTime < bookedStartDateTime && endDateTime > bookedStartDateTime) {
        errorObjConflicts.message = `Sorry, this spot is already booked for the specified dates`
        errorObjConflicts.errors.endDate = "End date conflicts with an existing booking"
    }
    if (startDateTime > bookedStartDateTime && startDateTime < bookedEndDateTime) {
        errorObjConflicts.message = `Sorry, this spot is already booked for the specified dates`;
        errorObjConflicts.errors.startDate = `Start date conflicts with an existing booking`
    }

    if (bookedStartDateTime > startDateTime && endDateTime > bookedEndDateTime) {
        errorObjConflicts.message = `Sorry, this spot is already booked for the specified dates`;
        errorObjConflicts.errors.startDate = `Start date conflicts with an existing booking`
        errorObjConflicts.errors.endDate = "End date conflicts with an existing booking"
    }
    if (Object.keys(errorObjConflicts).length > 0) {
        res.statusCode = 403;
        return res.json(errorObjConflicts)
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
    const today = new Date().getTime()
    if (!getBooking) {
        res.statusCode = 404;
        return res.json({
            message: `Booking couldn't be found`
        })
    }
    const start = getBooking.startDate.getTime()
    const end = getBooking.endDate.getTime()
    const getSpot = await Spot.findAll({ where: { ownerId: user.id } })


    if (today >= start || today >= end) {
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
