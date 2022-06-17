const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing for /book route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('A GET request to /books should return a list of books', () => {
    const req = request(app).get('/books');
    expect(req.status).toEqual(200);
  });
  afterAll(() => {
    pool.end();
  });
});
