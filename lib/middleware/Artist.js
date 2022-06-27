const pool = require('../utils/pool');

module.exports = class Artist {
  id;
  name;
  birthYear;
  constructor({ name, id, birth_year }) {
    this.birthYear = birth_year;
    this.name = name;
    this.id = id;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from artists');
    return rows.map((r) => new Artist(r));
  }

  static async getById(id) {
    const { rows } = await pool.query('select * from artists where id=$1', [
      id,
    ]);

    return rows[0] ? new Artist(rows[0]) : null;
  }
  static async insert({ name, birthYear }) {
    const { rows } = await pool.query(
      'INSERT INTO artists (name, birth_year) VALUES ($1,$2) RETURNING *',
      [name, birthYear]
    );

    return new Artist(rows[0]);
  }
};
