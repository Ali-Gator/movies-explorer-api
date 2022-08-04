const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { validateUserBody, validateProfileBody } = require('../middlewares/validations');
const NotFoundError = require('../errors/not-found-err');
const { NOT_FOUND_PATH } = require('../utils/constants');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateProfileBody, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/users', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PATH));
});

module.exports = router;
