const express = require('express')
const router = express.Router()
const { getMe, getAllUsers, registerUser, deleteUser, updateUser, loginUser } = require('../controllers/userController')



router.route('/').get(getAllUsers)
router.route('/me').get(getMe)
router.route('/:id').delete(deleteUser).put(updateUser)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

    





module.exports = router