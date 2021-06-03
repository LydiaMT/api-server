'use strict';

const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  complete: { type: Boolean, required: true },
  text: { type: String, required: true },
  difficulty: { type: Number, enum: [1,2,3,4] },
  assignee: { type: String, required: true }
});

const todoModel = mongoose.model('todo', todoSchema);

module.exports = todoModel;
