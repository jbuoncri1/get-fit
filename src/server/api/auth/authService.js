const moment = require('moment')

const query = require('../../model/query')
const { hashPassword, generateAccessToken, comparePasswords } = require('../../helper/validation')
const { successMessage, errorMessage, statusCodes } = require('../../helper/status')

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

    const data = {
      id: row.id,    
      email: row.email,
      createdAt: row.created_at
    }
    const token = await generateAccessToken(row.id, row.email)
    successMessage.data = data
    successMessage.token = token

    return res.status(statusCodes.CREATED).json(successMessage)
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
      errorMessage.message = 'User not found'
      return res.status(statusCodes.NOT_FOUND).json(errorMessage)
    }

    const foundUser = rows[0]
    const samePasswords = await comparePasswords(password, foundUser.password)

    if (!samePasswords) {
      errorMessage.message = 'Invalid username or password'
      return res.status(statusCodes.UNAUTHORIZED).json(errorMessage)
    }

    const token = await generateAccessToken(foundUser.id, foundUser.email)
    successMessage.token = token
    res.status(statusCodes.CREATED).json(successMessage)

    return res.json(response)
  } catch (err) {
    res.status(statusCodes.NOT_FOUND).json(err)
  }
} 

module.exports = {
  createUser,
  loginUser
}