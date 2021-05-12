const { Router } = require('express')
const router = Router()

const {
  getProfile,
  deleteUser
} = require('./profileService')

router.get('/', getProfile)
router.delete('/delete', deleteUser)

module.exports = router