const moment = require('moment')

const query = require('../../model/query')
const { hashPassword, generateAccessToken, comparePasswords } = require('../../helper/validation')
const { statusCodes } = require('../../helper/status')

const createUser = async (req, res) => {
  const { email, password } = req.body
  const hashedPassword = await hashPassword(password)
  const createdAt = moment()

  const createUserQuery = `
    INSERT INTO
    users(email, password, created_at)
    VALUES($1, $2, $3)
    returning *`

  const values = [email, hashedPassword, createdAt]

  try {
    const { rows } = await query(createUserQuery, values)
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

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const findUserQuery = `SELECT id, email, password FROM users WHERE email = $1`
    const { rows } = await query(findUserQuery, [email])

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

module.exports = {
  createUser,
  loginUser
}