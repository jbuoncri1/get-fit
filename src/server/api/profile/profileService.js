const { statusCodes } = require('../../helper/status')
const query = require('../../model/query')

const getProfile = async (req, res) => {
  const { userId } = req.user
  const getUserProfileQuery = `SELECT * FROM users WHERE id = $1`

  try {
    const { rows } = await query(getUserProfileQuery, [userId])

    if (!rows.length) {
      return res.status(statusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'User not found'
      })
    }

    const user = rows[0]
    return res.json(user)
  } catch (err) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

const deleteUser = async (req, res) => {
  const { userId } = req.user

  if (!userId) {
    return res.status(statusCodes.NOT_FOUND).json({
      status: 'error',
      message: 'User not found'
    })
  }

  const deleteUserQuery = `DELETE FROM users WHERE id = $1`

  try {
    await query(deleteUserQuery, [userId])
    delete req.user
    return res.status(statusCodes.NO_CONTENT).json({})
  } catch (err) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

module.exports = {
  getProfile,
  deleteUser
}