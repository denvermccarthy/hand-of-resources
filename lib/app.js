const express = require('express');
const path = require('path');
const app = express();

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// App routes

const bookHandler = require('./controllers/books');
app.use('/books', bookHandler);
const albumHandler = require('./controllers/albums');
app.use('/albums', albumHandler);
const artistHandler = require('./controllers/artists');
app.use('/artists', artistHandler);

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
