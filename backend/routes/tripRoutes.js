const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getTrips, setTrip, updateTrip, deleteTrip , getUsertrips, getOneTrip, sortTrips, cancelTrip, registerForTrip, unregisterForTrip,} = require('../controllers/tripController')

router.route('/').get(getTrips).post(protect, setTrip)
router.route('/sortedTrips').get(sortTrips)
router.route('/userTrips').get(protect, getUsertrips)
router.route('/cancel/:id').delete(protect, cancelTrip)
router.route('/register/:id').post(protect, registerForTrip)
router.route('/unregister/:id').post(protect, unregisterForTrip)
router.route('/:id').put(protect, updateTrip).delete(protect, deleteTrip).get(getOneTrip)       //The routes are read in order so keep routes with :id at the end
    





module.exports = router