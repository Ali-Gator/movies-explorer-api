const { NODE_ENV, JWT_SECRET, MONGO_DB_URL } = process.env;
module.exports = {
  DEFAULT_PORT: 3000,
  DB_ADDRESS: NODE_ENV === 'production' ? MONGO_DB_URL : 'mongodb://localhost:27017/moviesdb',
  SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  BAD_REQUEST_ERR: 400,
  NO_VALIDATE: 'Bad request. Check all fields for validity',
  UNAUTHORIZED_ERR: 401,
  UNAUTHORIZED_BAD_CREDENTIALS: 'Email and/or password are wrong',
  UNAUTHORIZED_MESSAGE: 'You have to sign-in first',
  FORBIDDEN_ERR: 403,
  FORBIDDEN_DELETE_MOVIE: 'You can delete ONLY your movies',
  NOT_FOUND_ERR: 404,
  NOT_FOUND_USER: 'User is not found',
  NOT_FOUND_MOVIE: 'Movie is not found',
  NOT_FOUND_PATH: 'No such route. Check method and/or path',
  CONFLICT_ERR: 409,
  CONFLICT_EMAIL: 'Email is already used',
  SERVER_ERR_MESSAGE: 'Server error',
  ALLOWED_CORS: [
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3000',
    'http://movie.nomoredomains.sbs',
    'https://movie.nomoredomains.sbs',
  ],
  URL_REGEXP: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i,
};
