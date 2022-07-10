const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing for songs', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('get to /movies should return a list of movies', async () => {
    const { body: movies } = await request(app).get('/movies');
    expect(movies.length > 1).toBe(true);
    expect(movies[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      rating: expect.any(Number),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
