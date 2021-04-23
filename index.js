'use strict';

const mongoose = require('mongoose');
const { default: MongoMemoryServer } = require('mongodb-memory-server');
module.exports = require('supertest');
const mongoServer = new MongoMemoryServer();


// const DataCollection = require('./src/models/data-collection-class.js');
// const food = new DataCollection();
// const clothes = new DataCollection();

const server = require('./src/server');
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/foodclothes';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  poolSize: 10
};

mongoServer.getConnectionString()
  .then(mongoUri => {
    mongoose.connect(mongoUri, options);
    server.start(PORT);
  });

