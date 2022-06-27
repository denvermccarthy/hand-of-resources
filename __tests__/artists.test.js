const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing for artists', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('/artists should send artists', async () => {
    const res = await request(app).get('/artists');
    expect(res.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
