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
};
