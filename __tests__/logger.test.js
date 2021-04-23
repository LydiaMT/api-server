'use strict';

require('@code-fellows/supergoose');
const logger = require('../src/middleware/logger');

describe('---------- LOGGER TEST ----------' , () => {
  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('properly logs some output', () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('properly moves to the next middleware', () => {
    logger(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
