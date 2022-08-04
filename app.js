require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { DEFAULT_PORT, ALLOWED_CORS } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const { errorHandler } = require('./middlewares/error-handler');

const { PORT = DEFAULT_PORT } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb')
  .catch(() => {
    throw new Error('Mongoose connection error');
  });

app.use(cors({ origin: ALLOWED_CORS, credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
