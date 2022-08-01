const { NODE_ENV } = process.env;
module.exports = {
  DEFAULT_PORT: NODE_ENV === 'production' ? 3000 : 3001,
  BAD_REQUEST_ERR: 400,
  NO_VALIDATE: 'Bad request. Check all fields for validity',
  NOT_FOUND_ERR: 404,
  NOT_FOUND_USER: 'User is not found',
};
