import { Router } from 'express'
const router = Router()

import { getProfileInfo, deleteProfile, updatePersonalInfo } from './profileService'

router.route('/')
  .get(getProfileInfo)
  .put(updatePersonalInfo)
  .delete(deleteProfile)

export default router
