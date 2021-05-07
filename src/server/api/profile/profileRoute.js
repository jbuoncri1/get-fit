const express = require('express')
const router = express.Router()

const {
  getProfile
} = require('./profileService')

router.get('/', getProfile)

module.exports = router