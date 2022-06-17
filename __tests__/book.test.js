const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { harryPotterObject } = require('.././data/booksData');

describe('testing for /book route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('A GET request to /books should return a list of books', async () => {
    const req = await request(app).get('/books');
    expect(req.status).toEqual(200);
    expect(req.body.length).toEqual(5);
    const harryPotterBook = req.body.find((book) => book.id === '1');
    expect(harryPotterBook).toMatchObject(harryPotterObject);
  });
  it('A GET request to /books/1 should return a single book with an id of 1', async () => {
    const req = await request(app).get('/books/1');
    expect(req.status).toEqual(200);
    expect(req.body).toMatchObject(harryPotterObject);
    expect(req.body.id).toEqual('1');
  });
  it('A POST request to /books should post the object sent to the database and return the row', async () => {
    const sentBook = {
      title: 'Harry Potter and the Chamber of Secrets',
      released: 1998,
    };
    const req = await request(app).post('/books').send(sentBook);
    console.log('req.body', req.body);
    expect(req.body.title).toEqual(sentBook.title);
    expect(req.body.released).toEqual(sentBook.released);
  });
  afterAll(() => {
    pool.end();
  });
});
