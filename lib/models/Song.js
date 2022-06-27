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
};
