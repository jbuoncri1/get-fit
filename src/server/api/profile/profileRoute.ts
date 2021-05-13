import { Router } from 'express'
const router = Router()

import { getProfile, deleteUser } from './profileService'

router.get('/', getProfile)
router.delete('/delete', deleteUser)

export default router