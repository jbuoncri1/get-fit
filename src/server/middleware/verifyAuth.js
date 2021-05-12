const { verify } = require('jsonwebtoken')
const { promisify } = require('util')
const { statusCodes } = require('../helper/status')

const jwtVerify = promisify(verify)

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(statusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'No token provided'
    })
  }

  try {
    const decoded = await jwtVerify(token, process.env.SECRET_KEY)
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
