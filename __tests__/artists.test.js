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
    const kdot = res.body.find((a) => a.name === 'Kendrick Lamar');

    expect(kdot.birthYear).toEqual(1987);
    expect(res.body.length > 1).toEqual(true);
  });

  afterAll(() => {
    pool.end();
  });
});
