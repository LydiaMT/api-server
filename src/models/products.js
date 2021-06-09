'use strict';

const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
  item: { type: String, default: 'test-item'},
  category: { type: String, default: 'Test', enum: ['Test', 'Electronics', 'Food'] },
  description: { type: String, default: 'test description' },
  total: { type: Number, default: 0 },
  inStock: { type: Number, default: 5 },
  price: { type: Number, default: 99 },
  img: { type: String, default: 'https://images.unsplash.com/photo-1596496181848-3091d4878b24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}
});

const productsModel = mongoose.model('products', productsSchema);

module.exports = productsModel;
