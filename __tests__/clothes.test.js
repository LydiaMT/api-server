'use strict';

require('@code-fellows/supergoose');

// const DataCollection = require('../src/models/data-collection-class.js');
// const Clothes = require('../src/models/clothes.js');
// const clothes = new DataCollection(Clothes);
const { clothes } = require('../src/routes/clothes.js');


describe(' ------------ CLOTHES ROUTES ------------ ', () => {

  let clothing = [];

  beforeAll( async () => {
    let createdClothes = await clothes.create({ size: 9, color: "blue", type: "SHIRT" });
      clothing.push(createdClothes)
    createdClothes = await clothes.create({ size: 9, color: "blue", type: "SHIRT" });
      clothing.push(createdClothes)
    createdClothes = await clothes.create({ size: 9, color: "blue", type: "SHIRT" });
      clothing.push(createdClothes)
  }); 

  it('can read() all clothing item', async () => {
    let allClothes = await clothes.read()
    expect(allClothes.length).toEqual(clothing.length)
  });

  it('can create() a new clothing item', async () => {
    let obj = { size: 9, color: "blue", type: "SHIRT" };
    let expected = { size: 9, color: "blue", type: "SHIRT" };

    return clothes.create(obj)
      .then(record => {
        Object.keys(obj).forEach(item => {
          expect(record[item]).toEqual(expected[item]);
        });
      });
  });

  it('can read() a single clothing item', () => {
    let obj = { size: 9, color: "one", type: "SHIRT" };

    return clothes.create(obj)
      .then(record => {
        return clothes.read(record._id)
          .then(item => {
            console.log('this should be test food 3', item);
          });
      });
  });

  // it('can update() a single clothes item', () => {

  // });

  // it('can delete() a single clothes item', () => {

  // });

});
