import { Router } from 'express'
const router = Router()

import verifyAuth from '../middleware/verifyAuth'
import authRoute from './auth/authRoute'
import profileRoute from './profile/profileRoute'

router.use('/auth', authRoute)
router.use('/profile', verifyAuth, profileRoute)

export default router
