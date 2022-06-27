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

  afterAll(() => {
    pool.end();
  });
});
