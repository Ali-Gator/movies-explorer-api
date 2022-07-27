require('dotenv').config();
const express = require('express');
const { DEFAULT_PORT } = require('./utils/constants');
const mongoose = require('mongoose');

const { PORT = DEFAULT_PORT } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb')
  .catch((e) => console.log(e));


app.listen(PORT, () => {});
