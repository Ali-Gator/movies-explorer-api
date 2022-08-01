const User = require('../models/user');
const {NOT_FOUND_USER, NO_VALIDATE} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request');

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new NotFoundError(NOT_FOUND_USER);
    res.send(user);
  } catch (e) {
    next(e);
  }
};

module.exports.patchUserProfile = async (req, res, next) => {
  try {
    const {email, name} = req.body;
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(userId, {
        email,
        name
      }, {
        new: true,
        runValidators: true,
      },
    );
    if (!user) throw new NotFoundError(NOT_FOUND_USER);
    res.send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(NO_VALIDATE));
    } else {
      next(e);
    }
  }
};
