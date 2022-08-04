const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized');
const { UNAUTHORIZED_BAD_CREDENTIALS } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  statics: {
    async findUserByCredentials(email, password) {
      const user = await this.findOne({ email }).select('+password');
      if (!user) {
        throw new UnauthorizedError(UNAUTHORIZED_BAD_CREDENTIALS);
      }
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        throw new UnauthorizedError(UNAUTHORIZED_BAD_CREDENTIALS);
      }
      return user;
    },
  },
});

module.exports = mongoose.model('user', userSchema);
