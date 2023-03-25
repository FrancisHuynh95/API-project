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

    console.log(getBookings)
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
    const today = new Date().getTime()
    const getBooking = await Booking.findByPk(getBookingId)
    const getSpot = await Spot.findAll({where:{ownerId:user.id},include: {model: Booking, where: {id: getBookingId}}})


    if (!getBooking) {
        res.statusCode = 404;
        return res.json({
            message: `Booking can't be found`
        })
    }


    if(getSpot.length === 0){
        res.statusCode = 404;
        return res.json({
            message: `Booking doesn't exist`
        })
    }
    const newArr = []
    getSpot.forEach(spot => {
        newArr.push(spot.toJSON())
  })

  if(user.id !== newArr[0].ownerId || user.id !== newArr[0].Bookings[0].userId){
      res.statusCode = 404;
      return res.json({
          message: "Unauthorized"
        })
    }

    let bookingStart = newArr[0].Bookings[0].startDate.getTime()
    let bookingEnd = newArr[0].Bookings[0].endDate.getTime()

  if(today >= bookingStart || today > bookingEnd){
    res.statusCode = 403;
    return res.json({
        message: `Bookings that have been started can't be deleted`
    })
  }

//   console.log(newArr[0].Bookings)

res.json({
    message: "Need to fix"
})


})



/*
Add Query Filters to Get All Spots

*/


module.exports = router;
