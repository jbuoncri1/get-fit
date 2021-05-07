const pool = require('./config')

module.exports = (queryText, params) => {
  return new Promise((resolve, reject) => {
    pool.query(queryText, params)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}