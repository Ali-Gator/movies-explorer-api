const { NODE_ENV } = process.env;
module.exports = {
  DEFAULT_PORT: NODE_ENV === 'production' ? 3000 : 3001,
};
