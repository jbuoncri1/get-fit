import { Request, Response } from 'express'

import { statusCodes } from '../../helper/status'
import query from '../../model/query'

export const getProfile = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.user
  const getUserProfileQuery = `SELECT * FROM users WHERE id = $1`

  try {
    const { rows } = await query(getUserProfileQuery, [userId])

    if (!rows.length) {
      return res.status(statusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'User not found'
      })
    }

    const user = rows[0]
    delete user.password
    return res.json(user)
  } catch (err) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.user

  if (!userId) {
    return res.status(statusCodes.NOT_FOUND).json({
      status: 'error',
      message: 'User not found'
    })
  }

  const deleteUserQuery = `DELETE FROM users WHERE id = $1`

  try {
    await query(deleteUserQuery, [userId])
    delete req.user
    return res.status(statusCodes.NO_CONTENT).json({})
  } catch (err) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}
