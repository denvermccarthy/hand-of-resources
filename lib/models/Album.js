const pool = require('../utils/pool');

module.exports = class Album {
  id;
  title;
  year_released;
  constructor({ id, title, year_released }) {
    this.id = id;
    this.title = title;
    this.year_released = year_released;
  }
  static async getAlbums() {
    const { rows } = await pool.query('select * from albums');
    return rows.map((row) => new Album(row));
  }
};
