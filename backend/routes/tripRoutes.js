const express = require('express')
const router = express.Router()
const { getTrips, setTrip, updateTrip, deleteTrip , getUsertrips, getAgenttrips } = require('../controllers/tripController')

router.route('/').get(getTrips).post(setTrip)
router.route('/:id').put(updateTrip).delete(deleteTrip)
router.route('/userTrips').get(getUsertrips)
router.route('/agentTrips').get(getAgenttrips)
    





module.exports = router