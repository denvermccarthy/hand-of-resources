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
  static async getBookById(id) {
    const { rows } = await pool.query('SELECT * from books WHERE id=$1', [id]);
    return rows.map((row) => new Book(row))[0];
  }
};
