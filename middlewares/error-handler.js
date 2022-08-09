const { SERVER_ERR_MESSAGE } = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? SERVER_ERR_MESSAGE
      : message,
  });
  next();
};
