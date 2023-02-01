const express = require('express')
const router = express.Router()
const { getMe, getAllAgents, registerAgent, deleteAgent, updateAgent, loginAgent } = require('../controllers/agentController')



router.route('/').get(getAllAgents)
router.route('/me').get(getMe)
router.route('/:id').delete(deleteAgent).put(updateAgent)
router.route('/register').post(registerAgent)
router.route('/login').post(loginAgent)

    





module.exports = router