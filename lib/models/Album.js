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
  static async getAlbumById(id) {
    const { rows } = await pool.query('select * from albums where id=$1', [id]);
    return new Album(rows[0]);
  }

  static async updateAlbumById(id, attributes) {
    const album = await this.getAlbumById(id);
    if (!album) return null;
    const { title, year_released } = { ...album, ...attributes };
    const { rows } = await pool.query(
      'UPDATE albums SET title=$2, year_released=$3 where id=$1 RETURNING *',
      [id, title, year_released]
    );
    return rows[0];
  }

  static async insertAlbum({ title, year_released }) {
    const { rows } = await pool.query(
      'INSERT into albums (title, year_released) VALUES($1, $2) RETURNING *;',
      [title, year_released]
    );

    return new Album(rows[0]);
  }
};
