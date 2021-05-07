const express = require('express')
const router = express.Router()

const {
  getProfile,
  deleteUser
} = require('./profileService')

router.get('/', getProfile)
router.delete('/delete', deleteUser)

module.exports = router