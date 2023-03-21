const express = require('express');
const router = express.Router();
const {spot} = require ('../../db/models/spot');


router.get('/', async(req,res) => {
    const getAll = await spot.findAll()
    res.statusCode = 200;
    res.json(getAll)
})


module.exports = router;
