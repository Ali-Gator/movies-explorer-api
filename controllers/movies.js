const Movie = require('../models/movie');
const {NO_VALIDATE, NOT_FOUND_MOVIE, FORBIDDEN_DELETE_MOVIE} = require('../utils/constants');
const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden');

const getMovies = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const movies = await Movie.find({owner: userId});
    res.send(movies);
  } catch (e) {
    next(e);
  }
};

const postMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId
    } = req.body;
    const movie = await Movie.create({
      owner, country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId
    });
    res.send(movie);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(NO_VALIDATE));
    } else {
      next(e);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) {
      throw new NotFoundError(NOT_FOUND_MOVIE);
    }
    if (movie.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError(FORBIDDEN_DELETE_MOVIE);
    }
    await Movie.findByIdAndRemove(req.params._id);
    res.send(movie);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie
}
