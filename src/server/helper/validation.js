const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')
const saltRounds = 10

const hashPassword = async (password) => await bcrypt.hash(password, saltRounds)

const generateAccessToken = (id, email) => sign({ userId: id, email }, process.env.SECRET_KEY)

const comparePasswords = async (enteredPassword, storedPassword) => await bcrypt.compare(enteredPassword, storedPassword)

module.exports = {
  hashPassword,
  generateAccessToken,
  comparePasswords
}