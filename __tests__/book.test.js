const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing for /book route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('A GET request to /books should return a list of books', async () => {
    const req = await request(app).get('/books');
    expect(req.status).toEqual(200);
    expect(req.body.length).toEqual(5);
    const harryPotterBook = req.body.find((book) => book.id === '1');
    expect(harryPotterBook).toMatchObject({
      id: '1',
      title: 'Harry Potter and the Philosophers Stone',
      released: 1997,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
