const router = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');
const { validateMovieBody, validateMongoIdParam } = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/', validateMovieBody, postMovie);
router.delete('/:_id', validateMongoIdParam, deleteMovie);

module.exports = router;
