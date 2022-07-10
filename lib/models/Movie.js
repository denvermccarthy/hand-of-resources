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
}

module.exports = Movie;
