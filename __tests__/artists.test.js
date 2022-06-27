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
  test('/artists/id should send the correct artist', async () => {
    const {
      body: { birthYear, name },
    } = await request(app).get('/artists/1');

    expect(birthYear).toEqual(1987);
    expect(name).toEqual('Kendrick Lamar');
  });
  test('post to /artists should send the created artist', async () => {
    const sent = {
      name: 'Freddie Gibbs',
      birthYear: 1993,
    };
    const {
      body: { birthYear, name },
    } = await request(app).post('/artists').send(sent);

    expect(birthYear).toEqual(sent.birthYear);
    expect(name).toEqual(sent.name);
  });
  test('delete to /artists/id should delete the correct artist', async () => {
    const { body } = await request(app).delete('/artists/1');
    expect(body.message).toEqual('Successfully deleted');

    const kdot = await request(app).get('/artists/1');
    expect(kdot.body).toEqual(null);
  });
  test('put to /artists/id should update the correct artist', async () => {
    const res = await request(app).put('/artists/1').send({ birthYear: 1900 });
    expect(res.status).toEqual(200);
    expect(res.body.birthYear).toEqual(1900);
  });

  afterAll(() => {
    pool.end();
  });
});
