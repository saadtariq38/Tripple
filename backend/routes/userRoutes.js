const express = require('express')
const router = express.Router()
const { getMe, getAllUsers, registerUser, deleteUser, updateUser, loginUser, getAllTravellers, getAllAgents, expiredToken, getOneAgentUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')



router.route('/').get(getAllUsers)
router.route('/traveller').get(getAllTravellers)
router.route('/agent').get(getAllAgents)
router.route('/me').get(protect, getMe)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/token').post(expiredToken)
router.route('/agent/:id').get(getOneAgentUser)
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser)

    





module.exports = router