const pool = require('../utils/pool');

class Movie {
  id;
  title;
  rating;
  constructor(row) {
    for (const key in row) {
      this[key] = row[key];
    }
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM movies');

    return rows.map((r) => new Movie(r));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM movies WHERE id=$1', [id]);

    return rows[0] ? new Movie(rows[0]) : null;
  }

  static async insert({ title, rating }) {
    const { rows } = await pool.query(
      'INSERT INTO movies (title, rating) VALUES ($1, $2) RETURNING *',
      [title, rating]
    );

    return new Movie(rows[0]);
  }

  static async updateById(id, attrs) {
    const movie = await this.getById(id);
    if (!movie) throw new Error(`Unable to find movie with id:${id}`);
    const { title, rating } = { ...movie, ...attrs };
    const { rows } = await pool.query(
      'UPDATE movies SET title=$2, rating=$3 WHERE id=$1 RETURNING *',
      [id, title, rating]
    );
    return new Movie(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM movies WHERE id=$1', [id]);
    return rows[0];
  }
}

module.exports = Movie;
