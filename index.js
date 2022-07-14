const {
  readBodyParams,
  readBody,
  logRequestHandler,
  handleApiRouter,
  guestBookRouter,
} = require('./src/handlers/handlers.js')

const fs = require('fs');

const readData = (path) => {
  return fs.readFileSync(path, 'utf-8');
};

const commentsPath = './data/comments.json';
const templatePath = './templates/guestBook.html';

const guestBook = JSON.parse(readData(commentsPath));
const template = readData(templatePath);

const express = require('express');

const app = express();

app.listen(9090, () => console.log('listening port no 9090'));

app.use(express.urlencoded());
app.use(readBodyParams);
app.use(readBody);

app.use(logRequestHandler);
app.use(express.static('public'));

app.get('/guest-book', guestBookRouter(guestBook, template, commentsPath));

app.post('/add-comment', guestBookRouter(guestBook, template, commentsPath));

app.get('/api/guest-book', handleApiRouter(guestBook));
