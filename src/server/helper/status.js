const statusCodes = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR:500
}

const successMessage = {
  status: 'success'
}

const errorMessage = {
  status: 'error'
}

module.exports = {
  successMessage,
  errorMessage,
  statusCodes
}