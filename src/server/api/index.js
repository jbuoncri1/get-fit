const express = require('express')
const router = express.Router()

const verifyAuth = require('../middleware/verifyAuth')

router.use('/auth', require('./auth/authRoute'))
router.use('/profile', verifyAuth, require('./profile/profileRoute'))

module.exports = router
