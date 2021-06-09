'use strict';

const express = require('express');
const { Error } = require('mongoose');

const DataCollection = require('../models/data-collection-class.js');
const Products = require('../models/products.js');
const products = new DataCollection(Products);

const productsRouter = express.Router();

// ------------------- Routes -------------------
productsRouter.get('/products', getProducts);
productsRouter.get('/products/:id', getOneProducts);
productsRouter.post('/products', createProducts);
productsRouter.put('/products/:id', updateProducts);
productsRouter.delete('/products/:id', deleteProducts);

// ------------------- Route handlers -------------------

async function getProducts(req, res) {
  let getAllProducts = await products.read()
  res.status(200).json(getAllProducts);
}

async function getOneProducts(req, res, next) {
  const id = req.params.id;
  let singleProducts = await products.read(id);
  if(singleProducts){
    res.status(200).json(singleProducts);
  } else {
    next()
  }
}

async function createProducts(req, res) {
  let content = req.body;
  console.log(content)
  try {
    let createdProducts = await products.create(content)
    res.status(201).json(createdProducts);
  } catch(error) {
    console.error(error)
    res.status(500).json({message: error.message})
  }
  
}

async function updateProducts(req, res) {
  const id = req.params.id;
  let content = req.body;
  let updatedProducts = await products.update(id, content);
  res.status(200).json(updatedProducts);
}

async function deleteProducts(req, res) {
  const id = req.params.id;
  let deletedProducts = await products.delete(id);
  res.status(201).json(deletedProducts);
}

module.exports = { 
  productsRouter,
  products
};
