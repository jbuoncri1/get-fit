import { Router } from 'express'
const router = Router()

import { getProfile, deleteProfile, updateProfile, addPersonalInfo } from './profileService'

router.route('/')
  .get(getProfile)
  .put(updateProfile)
  .delete(deleteProfile)

router.put('/info', addPersonalInfo)

export default router
