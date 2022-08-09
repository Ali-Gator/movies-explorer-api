const {celebrate, Joi} = require('celebrate');
const {URL_REGEXP} = require('../utils/constants');

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(URL_REGEXP).required(),
    trailerLink: Joi.string().pattern(URL_REGEXP).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().pattern(URL_REGEXP).required(),
    movieId: Joi.number().required(),
  }),
});

const validateMongoIdParam = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateProfileBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  })
});

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  })
});

module.exports = {
  validateMovieBody,
  validateMongoIdParam,
  validateProfileBody,
  validateUserBody,
  validateAuth
};
