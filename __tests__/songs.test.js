const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing for songs', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('GET to /songs should return a list of songs', async () => {
    const res = await request(app).get('/songs');
    expect(res.status).toEqual(200);
    const mtrees = res.body.find((song) => song.title === 'Money Trees');
    expect(mtrees.minutes).toEqual(6);
    expect(res.body.length > 1).toEqual(true);
  });
  test('GET to /songs/id should send the correct song', async () => {
    const res = await request(app).get('/songs/2');
    expect(res.status).toEqual(200);
    expect(res.body.title).toEqual('Backseat Freestyle');
    expect(res.body.minutes).toEqual(3);
  });
  test('Post to /songs should add a song', async () => {
    const songData = {
      title: 'Total Football',
      minutes: 4,
    };
    const res = await request(app).post('/songs').send(songData);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      ...songData,
      id: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
