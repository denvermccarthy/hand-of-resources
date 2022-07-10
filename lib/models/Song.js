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
  static async insert({ title, minutes }) {
    const { rows } = await pool.query(
      'INSERT INTO songs (title, minutes) VALUES ($1, $2) RETURNING *',
      [title, minutes]
    );
    return new Song(rows[0]);
  }
  static async updateById(id, attrs) {
    const song = await this.getById(id);
    if (!song) throw new Error(`Unable to find song with id:${id}`);
    const { title, minutes } = { ...song, ...attrs };
    const { rows } = await pool.query(
      'UPDATE songs SET title=$2, minutes=$3 WHERE id=$1 RETURNING *',
      [id, title, minutes]
    );

    return new Song(rows[0]);
  }
};
