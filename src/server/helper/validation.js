const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { promisify } = require('util')
const saltRounds = 10

const jwtSign = promisify(sign)

const hashPassword = async (password) => await bcrypt.hash(password, saltRounds)

const generateAccessToken = async (id, email) => await jwtSign({ userId: id, email }, process.env.SECRET_KEY)

const comparePasswords = async (enteredPassword, storedPassword) => await bcrypt.compare(enteredPassword, storedPassword)

module.exports = {
  hashPassword,
  generateAccessToken,
  comparePasswords
}