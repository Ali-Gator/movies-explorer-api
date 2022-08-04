const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = {
  DEFAULT_PORT: NODE_ENV === 'production' ? 3000 : 3001,
  SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  BAD_REQUEST_ERR: 400,
  NO_VALIDATE: 'Bad request. Check all fields for validity',
  UNAUTHORIZED_ERR: 401,
  UNAUTHORIZED_BAD_CREDENTIALS: 'Email and/or password are wrong',
  UNAUTHORIZED_MESSAGE: 'You have to sign-in first',
  FORBIDDEN_ERR: 403,
  FORBIDDEN_DELETE_MOVIE: 'You can delete ONLY yours movies',
  NOT_FOUND_ERR: 404,
  NOT_FOUND_USER: 'User is not found',
  NOT_FOUND_MOVIE: 'Movie is not found',
  NOT_FOUND_PATH: 'No such path',
  CONFLICT_ERR: 409,
  CONFLICT_EMAIL: 'Email is already used',
  SERVER_ERR_MESSAGE: 'Server error',
  ALLOWED_CORS: [
    'http://127.0.0.1:3001',
    'http://mesto-ali.nomoredomains.xyz',
    'https://mesto-ali.nomoredomains.xyz',
  ],
};
