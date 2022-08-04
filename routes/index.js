const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const {createUser, login} = require('../controllers/users');
const {validateUserBody, validateProfileBody} = require('../middlewares/validations');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateProfileBody, login);

router.use('/users', userRouter)
router.use('/users', movieRouter)

module.exports = router;
