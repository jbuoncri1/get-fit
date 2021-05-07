const { verify } = require('jsonwebtoken')
const { promisify } = require('util')
const { errorMessage, statusCodes } = require('../helper/status')

const jwtVerify = promisify(verify)

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    errorMessage.message = 'No token provided'
    return res.status(statusCodes.BAD_REQUEST).json(errorMessage)
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
    errorMessage.error = 'Authentication Failed'
    return res.status(statusCodes.UNAUTHORIZED).send(errorMessage)
  }
}
