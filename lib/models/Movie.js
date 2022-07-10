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
}

module.exports = Movie;
