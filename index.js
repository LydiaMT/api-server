'use strict';

const mongoose = require('mongoose');
const DataCollection = require('./src/models/data-collection-class.js');
// const food = new DataCollection();
// const clothes = new DataCollection();

const server = require('./src/server');
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/foodclothes';

const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(MONGODB_URI, options);

server.start(PORT);
