const { Router } = require('express')
const router = Router()

const {
  createUser,
  loginUser
} = require('./authService')

router.post('/signup', createUser)
router.post('/login', loginUser)

module.exports = router