const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing for songs', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('get to /movies should return a list of movies', async () => {
    const resp = await request(app).get('/movies');
    const { body: movies } = resp;
    expect(resp.status).toBe(200);
    expect(movies.length > 1).toBe(true);
    expect(movies[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      rating: expect.any(Number),
    });
  });
  test('get to /movies/id should return a movie', async () => {
    const resp = await request(app).get('/movies/1');
    const { body: movies } = resp;
    expect(resp.status).toBe(200);
    expect(movies).toEqual({
      id: '1',
      title: expect.any(String),
      rating: expect.any(Number),
    });
  });
  test('post to /movies should add a movie', async () => {
    const movie = { title: 'Happy Gilmore', rating: 100 };
    const resp = await request(app).post('/movies').send(movie);
    const { body: movieRes } = resp;
    expect(resp.status).toBe(200);
    expect(movieRes).toEqual({
      id: expect.any(String),
      ...movie,
    });
  });
  test('put to /movies/id should update a movie', async () => {
    const movie = { title: 'Happy Feet', rating: 99 };
    const { body: newMovie } = await request(app).post('/movies').send(movie);
    const resp = await request(app)
      .put(`/movies/${newMovie.id}`)
      .send({ rating: 999 });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      title: movie.title,
      rating: 999,
    });
  });
  test('delete to /movies should delete a movie', async () => {
    const movie = { title: 'Happy Gilmore', rating: 100 };
    const { body: newMovie } = await request(app).post('/movies').send(movie);
    const resp = await request(app).delete(`/movies/${newMovie.id}`);
    expect(resp.status).toBe(200);
  });
  afterAll(() => {
    pool.end();
  });
});
