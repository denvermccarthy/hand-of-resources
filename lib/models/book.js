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
    return rows.map((row) => new Book(row));
  }
  static async getBookById(id) {
    const { rows } = await pool.query('SELECT * from books WHERE id=$1', [id]);
    return new Book(rows[0]);
  }
  static async insertBook({ title, released }) {
    const { rows } = await pool.query(
      'INSERT into books (title, released) VALUES ($1, $2) RETURNING *',
      [title, released]
    );
    return new Book(rows[0]);
  }
};
