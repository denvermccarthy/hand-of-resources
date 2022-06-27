const pool = require('../utils/pool');

module.exports = class Song {
  id;
  title;
  minutes;
  constructor(row) {
    for (const key in row) {
      this[key] = row[key];
    }
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * from songs');
    return rows.map((r) => new Song(r));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM songs WHERE id=$1', [id]);
    return rows[0] ? new Song(rows[0]) : null;
  }
};
