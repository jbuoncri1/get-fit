import { Request, Response } from 'express'
import moment from 'moment'

import { getProfileInfoQuery, deleteProfileQuery, updateProfileQuery } from './profileQueryStrings'
import { statusCodes } from '../../helper/status'
import query from '../../model/query'
import { IUserPersonalInfo } from '../../model/types/user'

export const getProfileInfo = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.user

  try {
    const { rows } = await query({ text: getProfileInfoQuery, values: [userId] })

    if (!rows.length) {
      return res.status(statusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'User not found'
      })
    }

    const user = rows[0]
    return res.json(user)
  } catch (err) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

export const deleteProfile = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.user

  if (!userId) {
    return res.status(statusCodes.NOT_FOUND).json({
      status: 'error',
      message: 'User not found'
    })
  }

  try {
    await query({ text: deleteProfileQuery, values: [userId] })
    delete req.user
    return res.status(statusCodes.NO_CONTENT).json({})
  } catch (err) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

export const updatePersonalInfo = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.user

  const { first_name, last_name, gender, height, weight, date_of_birth } = req.body
  const dateOfBirth = moment(date_of_birth)
  const modifiedAt = moment()

  const values = [first_name, last_name, gender, height, weight, dateOfBirth, modifiedAt, userId]

  try {
    await query({ text: updateProfileQuery, values })
    return res.status(204).json()
  } catch (err) {
    return res.json(err)
  }
}
