'use strict';

const express = require('express');

const DataCollection = require('../models/data-collection-class.js');
const Food = require('../models/food.js');
const food = new DataCollection(Food);

const foodRouter = express.Router();

// ------------------- Routes -------------------
foodRouter.get('/food', getFood);
foodRouter.get('/food/:id', getOneFood);
foodRouter.post('/food', createFood);
foodRouter.put('/food/:id', updateFood);
foodRouter.delete('/food/:id', deleteFood);

// ------------------- Route handlers -------------------

async function getFood(req, res) {
  let getAllFood = await food.read()
  res.status(200).json(getAllFood);
}

async function getOneFood(req, res, next) {
  const id = req.params.id;
  let singleFood = await food.read(id);
  if(singleFood){
    res.status(200).json(singleFood);
  } else {
    next()
  }
}

async function createFood(req, res) {
  let content = req.body;
  let createdFood = await food.create(content)
  res.status(201).json(createdFood);
}

async function updateFood(req, res) {
  const id = req.params.id;
  let content = req.body;
  let updatedFood = await food.update(id, content);
  res.status(200).json(updatedFood);
}

async function deleteFood(req, res) {
  const id = req.params.id;
  let deletedFood = await food.delete(id);
  res.status(201).json(deletedFood);
}

module.exports = { 
  foodRouter,
  food
};
