const { statusCodes } = require('../../helper/status')
const query = require('../../model/query')

const getProfile = async (req, res) => {
  const { userId } = req.user
  const getUserProfileQuery = `SELECT * FROM users WHERE id = $1`

  try {
    const { rows } = await query(getUserProfileQuery, [userId])
    const user = rows[0]
    return res.json(user)
  } catch (err) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

module.exports = {
  getProfile
}