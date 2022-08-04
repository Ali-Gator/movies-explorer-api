const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NOT_FOUND_USER, NO_VALIDATE, CONFLICT_EMAIL, SECRET,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request');
const ConflictError = require('../errors/conflict');

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new NotFoundError(NOT_FOUND_USER);
    res.send(user);
  } catch (e) {
    next(e);
  }
};

const patchUserProfile = async (req, res, next) => {
  try {
    const {email, name} = req.body;
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(userId, {
      email,
      name,
    }, {
      new: true,
      runValidators: true,
    });
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

const createUser = async (req, res, next) => {
  try {
    const {email, name, password} = req.body;
    const passwordHashed = await bcrypt.hash(password, 10);
    await User.create({name, email, password: passwordHashed});
    res.send({name, email});
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(NO_VALIDATE));
    } else if (e.code === 11000) {
      next(new ConflictError(CONFLICT_EMAIL));
    } else {
      next(e);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      {_id: user._id},
      SECRET,
      {expiresIn: '7d'},
    );
    res.send({token});
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCurrentUser,
  patchUserProfile,
  createUser,
  login,
};
