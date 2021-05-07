const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10

const hashPassword = async (password) => await bcrypt.hash(password, saltRounds)

const generateAccessToken = async (id, email) => await jwt.sign({ userId: id, email }, process.env.SECRET_KEY, { expiresIn: '1d' })

const comparePasswords = async (enteredPassword, storedPassword) => await bcrypt.compare(enteredPassword, storedPassword)

module.exports = {
  hashPassword,
  generateAccessToken,
  comparePasswords
}