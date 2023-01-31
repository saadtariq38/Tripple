const express = require('express')
const router = express.Router()
const { getTrips, setTrip, updateTrip, deleteTrip } = require('../controllers/tripController')

router.route('/').get(getTrips).post(setTrip)
router.route('/:id').put(updateTrip).delete(deleteTrip)
    





module.exports = router