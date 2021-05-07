const jwt = require('jsonwebtoken')
const { errorMessage, statusCodes } = require('../helper/status')

const verifyAuth = async (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    errorMessage.message = 'No token provided'
    return res.status(statusCodes.BAD_REQUEST).json(errorMessage)
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
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

module.exports = {
  verifyAuth
}