import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { promisify } from 'util'

import { statusCodes } from '../helper/status'
import { IUser } from '../model/types/user'

const jwtVerify = promisify(verify)

export default async (req: Request, res: Response, next: NextFunction): Promise<NextFunction | Response> => {
  const authHeader: string = req.headers['authorization']
  const token: string = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(statusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'No token provided'
    })
  }

  try {
    const decoded: IUser = await jwtVerify(token, process.env.SECRET_KEY)
    const { userId, email } = decoded
    
    req.user = {
      userId,
      email
    }

    next()
  } catch (err) {
    return res.status(statusCodes.UNAUTHORIZED).send({
      status: 'error',
      message: 'Authentication Failed',
      err
    })
  }
}
