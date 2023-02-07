const express = require('express')
const router = express.Router()
const { getMe, getAllUsers, registerUser, deleteUser, updateUser, loginUser, getAllTravellers, getAllAgents } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')



router.route('/').get(getAllUsers)
router.route('/traveller').get(getAllTravellers)
router.route('/agent').get(getAllAgents)
router.route('/me').get(protect, getMe)
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

    





module.exports = router