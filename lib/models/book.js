const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  released;
  constructor({ id, title, released }) {
    this.id = id;
    this.title = title;
    this.released = released;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from books;');
    const books = rows.map((row) => new Book(row));
    return books;
  }
};
