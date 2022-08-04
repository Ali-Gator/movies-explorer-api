const router = require('express').Router();
const {getCurrentUser, patchUserProfile} = require('../controllers/users');
const {validateProfileBody} = require('../middlewares/validations');

router.get('/me', getCurrentUser);
router.patch('/me', validateProfileBody, patchUserProfile);

module.exports = router;
