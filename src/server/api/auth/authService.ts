import { Request, Response } from 'express'
import moment from 'moment'

import { createUserQuery, findUserQuery } from './authQueryStrings'
import query from '../../model/query'
import { hashPassword, generateAccessToken, comparePasswords } from '../../helper/validation'
import { statusCodes } from '../../helper/status'
import { IUserCredentials } from '../../model/types/user'

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password }: IUserCredentials = req.body
  const hashedPassword = await hashPassword(password)
  const createdAt = moment()

  try {
    const { rows } = await query({ text: createUserQuery, values: [email, hashedPassword, createdAt] })
    const row = rows[0]

    const response = {
      status: 'success',
      code: statusCodes.CREATED,
      data: {
        id: row.id,    
        email: row.email,
        createdAt: row.created_at
      }
    }

    return res.status(statusCodes.CREATED).json(response)
  } catch (err) {
    if (err.code = 23505) {
      return res.status(statusCodes.BAD_REQUEST).json({ error: `User already exists` })
    }
  }
}

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password }: IUserCredentials = req.body
  try {
    
    const { rows } = await query({ text: findUserQuery, values:[email] })

    if (!rows.length) {
      return res.status(statusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'User not found'
      })
    }

    const foundUser = rows[0]
    const samePasswords = await comparePasswords(password, foundUser.password)

    if (!samePasswords) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        status: 'error',
        message: 'Invalid username or password'
      })
    }

    const token = generateAccessToken(foundUser.id, foundUser.email)

    const response = {
      status: 'SUCCESS',
      code: statusCodes.CREATED,
      token
    }
    return res.status(statusCodes.CREATED).json(response)
  } catch (err) {
    res.status(statusCodes.NOT_FOUND).json(err)
  }
} 
