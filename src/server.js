'use strict';

const express = require('express');
const app = express();

const logger = require('./middleware/logger');
const { foodRouter } = require('./routes/food.js');
const { clothesRouter }= require('./routes/clothes.js');
const notFound =require('./error-handlers/404.js');
const errors = require('./error-handlers/500.js');

app.use(express.json());
app.use(logger);

app.use(clothesRouter);
app.use(foodRouter);

app.use('*', notFound);
app.use(errors);

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => console.log(`server up on http://localhost:${port}`));
  }
};
