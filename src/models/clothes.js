'use strict';

const mongoose = require('mongoose');

const clothesSchema = mongoose.Schema({
  size: { type: Number, required: true },
  color: { type: String, required: true },
  type: { type: String, uppercase: true, enum: ['SHIRT', 'PANTS', 'SHORTS', 'DRESS', 'JACKET'] }
});

const clothesModel = mongoose.model('clothes', clothesSchema);

module.exports = clothesModel;
