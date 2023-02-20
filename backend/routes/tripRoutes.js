const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getTrips, setTrip, updateTrip, deleteTrip , getUsertrips, getOneTrip,} = require('../controllers/tripController')

router.route('/').get(getTrips).post(protect, setTrip)
router.route('/:id').put(updateTrip).delete(deleteTrip).get(getOneTrip)
router.route('/userTrips').get(protect, getUsertrips)
    





module.exports = router