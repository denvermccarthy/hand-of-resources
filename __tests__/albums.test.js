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
  test('should send an object with the id matching the route', async () => {
    const req = await request(app).get('/albums/1');
    expect(req.status).toEqual(200);
    expect(req.body.title).toEqual('Section.80');
    expect(req.body.year_released).toEqual(2011);
  });
  it('A PUT request to /albums/1 should update the object', async () => {
    const req = await request(app)
      .put('/albums/1')
      .send({ year_released: 2012 });
    expect(req.status).toEqual(200);
    expect(req.body.year_released).toEqual(2012);
  });
});
