const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');
const { UNAUTHORIZED_MESSAGE, SECRET } = require('../utils/constants');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(
      token,
      SECRET,
      (err, payload) => {
        if (err) throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
        req.user = payload;
      },
    );
    next();
  } catch (e) {
    next(e);
  }
};
