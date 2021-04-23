'use strict';

require('@code-fellows/supergoose');

// const DataCollection = require('../src/models/data-collection-class.js');
// const Food = require('../src/models/food.js');
// const food = new DataCollection(Food);
const { food } = require('../src/routes/food.js');


describe(' ------------ FOOD ROUTES ------------ ', () => {

  let foods = [];

  beforeAll( async () => {
    let createdFood = await food.create({ name: 'test food 1', calories: 9999, type: 'FRUIT' })
      foods.push(createdFood)
    createdFood = await food.create({ name: 'test food 1', calories: 9999, type: 'FRUIT' })
      foods.push(createdFood)
    createdFood = await food.create({ name: 'test food 1', calories: 9999, type: 'FRUIT' })
      foods.push(createdFood)
  }); 

  it('can read() all food item', async () => {
    let allFood = await food.read()
    expect(allFood.length).toEqual(foods.length)
  });

  it('can create() a new food item', async () => {
    let obj = { name: 'test food 1', calories: 9999, type: 'FRUIT' };
    let expected = { name: 'test food 1', calories: 9999, type: 'FRUIT' };

    return food.create(obj)
      .then(record => {
        Object.keys(obj).forEach(item => {
          expect(record[item]).toEqual(expected[item]);
        });
      });
  });

  it('can read() a single food item', () => {
    let obj = { name: 'test food 3', calories: 9999, type: 'VEG' };

    return food.create(obj)
      .then(record => {
        return food.read(record._id)
          .then(item => {
            console.log('this should be test food 3', item);
          });
      });
  });

  // it('can update() a single food item', () => {

  // });

  // it('can delete() a single food item', () => {

  // });

});
