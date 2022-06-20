const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing for /albums route', () => {
  test('should render a list of albums', async () => {
    const req = await request(app).get('/albums');
    expect(req.status).toEqual(200);
    const mrMorale = req.body.find((album) => album.id === '5');
    expect(mrMorale.title).toEqual('Mr. Morale & the Big Steppers');
  });
});
