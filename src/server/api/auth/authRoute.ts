import { Router } from 'express'
const router = Router()

import { createUser, loginUser } from './authService'

router.post('/signup', createUser)
router.post('/login', loginUser)

export default router