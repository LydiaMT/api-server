'use strict';

const express = require('express');
const { Error } = require('mongoose');

const DataCollection = require('../models/data-collection-class.js');
const Todo = require('../models/todo.js');
const todo = new DataCollection(Todo);

const todoRouter = express.Router();

// ------------------- Routes -------------------
todoRouter.get('/todo', getTodo);
todoRouter.get('/todo/:id', getOneTodo);
todoRouter.post('/todo', createTodo);
todoRouter.put('/todo/:id', updateTodo);
todoRouter.delete('/todo/:id', deleteTodo);

// ------------------- Route handlers -------------------

async function getTodo(req, res) {
  let getAllTodo = await todo.read()
  res.status(200).json(getAllTodo);
}

async function getOneTodo(req, res, next) {
  const id = req.params.id;
  let singleTodo = await todo.read(id);
  if(singleTodo){
    res.status(200).json(singleTodo);
  } else {
    next()
  }
}

async function createTodo(req, res) {
  let content = req.body;
  console.log(content)
  try {
    let createdTodo = await todo.create(content)
    res.status(201).json(createdTodo);
  } catch(error) {
    console.error(error)
    res.status(500).json({message: error.message})
  }
  
}

async function updateTodo(req, res) {
  const id = req.params.id;
  let content = req.body;
  let updatedTodo = await todo.update(id, content);
  res.status(200).json(updatedTodo);
}

async function deleteTodo(req, res) {
  const id = req.params.id;
  let deletedTodo = await todo.delete(id);
  res.status(201).json(deletedTodo);
}

module.exports = { 
  todoRouter,
  todo
};
