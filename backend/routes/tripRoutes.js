const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getTrips, setTrip, updateTrip, deleteTrip , getUsertrips, getOneTrip, sortTrips, cancelTrip, registerForTrip, unregisterForTrip, addTripReview, getOneAgentTrip} = require('../controllers/tripController')

router.route('/').get(getTrips).post(protect, setTrip)
router.route('/sortedTrips').post(sortTrips)
router.route('/userTrips').get(protect, getUsertrips)
router.route('/agent/:id').get(protect, getOneAgentTrip)
router.route('/cancel/:id').put(protect, cancelTrip)
router.route('/register/:id').post(protect, registerForTrip)
router.route('/unregister/:id').put(protect, unregisterForTrip)
router.route('/review/:id').post(protect, addTripReview)
router.route('/:id').put(protect, updateTrip).delete(protect, deleteTrip).get(getOneTrip)       //The routes are read in order so keep routes with :id at the end
    





module.exports = router