'use strict';

require('@code-fellows/supergoose');
const { server } = require('../src/server.js');
const { food } = require('../src/routes/food.js');
const { clothes } = require('../src/routes/clothes.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('---------- SERVER TEST ----------', () => {

/////////////////////////// MOCK DB FOR TESTING /////////////////////////// 
  let foods = [];
  let clothing = [];

  beforeAll( async () => {
    let createdFood = await food.create({ name: 'test food 1', calories: 9999, type: 'FRUIT' })
      foods.push(createdFood)
    createdFood = await food.create({ name: 'test food 2', calories: 9999, type: 'FRUIT' })
      foods.push(createdFood)
    createdFood = await food.create({ name: 'test food 3', calories: 9999, type: 'FRUIT' })
      foods.push(createdFood)
    let createdClothes = await clothes.create({ size: 9, color: "one", type: "SHIRT" });
      clothing.push(createdClothes)
    createdClothes = await clothes.create({ size: 9, color: "two", type: "SHIRT" });
      clothing.push(createdClothes)
    createdClothes = await clothes.create({ size: 9, color: "three", type: "SHIRT" });
      clothing.push(createdClothes)
  }); 

/////////////////////////// FOOD TESTS /////////////////////////// 
// --------------- Read a food record using GET ---------------
  it('should retrieve a food item from the database with the same id', async () => {
    const response = await mockRequest.get(`/food/${foods[0]._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('test food 1');
  });

// --------------- Read a list of food records using GET ---------------
  it('should retrieve all food items from the database', async () => {
    const response = await mockRequest.get('/food');
    expect(response.body.length).toEqual(foods.length);
    expect(response.status).toBe(200);
  });

// --------------- Create a food record using POST ---------------
  it('should create a new food item in the database', async () => {
    const response = await mockRequest.post('/food').send({name: "pizza", calories: 9999, type: "FRUIT"})
    expect(response.status).toBe(201);
    expect(response.body.type).toEqual("FRUIT");
  });

// --------------- Update a food record using PUT ---------------
  it('should update a food item in the database', async () => {
    const response = await mockRequest.put(`/food/${foods[0]._id}`).send({name: "apple", calories: 9999, type: "FRUIT"})
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("apple");
  });

// --------------- Destroy a food record using DELETE ---------------
  it('should delete a food item from the database', async () => {
    let response = await mockRequest.delete(`/food/${foods[0]._id}`)
    expect(response.status).toBe(201);
    response = await mockRequest.get(`/food/${foods[0]._id}`);
    expect(response.status).toBe(404);
  });

/////////////////////////// CLOTHES TESTS /////////////////////////// 
// --------------- Read a clothes record using GET ---------------
it('should retrieve a clothing item from the database with the same id', async () => {
  const response = await mockRequest.get(`/clothes/${clothing[0]._id}`);
  expect(response.status).toBe(200);
  expect(response.body.color).toEqual('one');
});

// --------------- Read a list of clothes records using GET ---------------
it('should retrieve all clothing items from the database', async () => {
  const response = await mockRequest.get('/clothes');
  expect(response.body.length).toEqual(clothing.length);
  expect(response.status).toBe(200);
});

// --------------- Create a clothes record using POST ---------------
it('should create a new clothing item in the database', async () => {
  const response = await mockRequest.post('/clothes').send({ size: 9, color: "one", type: "SHIRT" })
  expect(response.status).toBe(201);
  expect(response.body.type).toEqual("SHIRT");
});

// --------------- Update a clothes record using PUT ---------------
it('should update a clothing item in the database', async () => {
  const response = await mockRequest.put(`/clothes/${clothing[0]._id}`).send({ size: 9, color: "four", type: "SHIRT" })
  expect(response.status).toBe(200);
  expect(response.body.color).toEqual("four");
});

// --------------- Destroy a clothes record using DELETE ---------------
it('should delete a clothing item from the database', async () => {
  let response = await mockRequest.delete(`/clothes/${clothing[0]._id}`)
  expect(response.status).toBe(201);
  response = await mockRequest.get(`/clothes/${clothing[0]._id}`);
  expect(response.status).toBe(404);
});

/////////////////////////// 404 TESTS /////////////////////////// 

  it('handles invalid requests', async () => {
    const response = await mockRequest.get('/foo');
    expect(response.status).toEqual(404);
  })

  it('handles invalid methods', async () => {
    const response = await mockRequest.patch('/food');
    expect(response.status).toEqual(404);
  })

});


