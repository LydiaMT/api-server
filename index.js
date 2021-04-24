'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server');
const PORT = process.env.PORT || 3000;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'foodclothes'
};

mongoose.connect(process.env.MONGODB_URI, options)
  .catch( error => console.error(error));
server.start(PORT);
