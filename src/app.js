const express = require('express');

const {
  authenticate,
  injectSession,
  injectCookie,
  loginHandler,
  logoutHandler,
  uploadFileHandler,
  readBodyParams,
  readBody,
  logRequestHandler,
  handleApiRouter,
  guestBookRouter,
  registerUser,
} = require('./handlers/handlers.js')

const fs = require('fs');

const readData = (path) => {
  return fs.readFileSync(path, 'utf-8');
};

const createApp = (commentsPath, templatePath, usersPath, sessions) => {
  const guestBook = JSON.parse(readData(commentsPath));
  const template = readData(templatePath);
  const users = JSON.parse(readData(usersPath));

  const app = express();

  app.use(express.urlencoded(
    { extended: true }
  ));

  app.use(readBodyParams);
  app.use(readBody);
  app.use(injectCookie);
  app.use(injectSession(sessions));
  app.use(logRequestHandler);

  app.get('/register', registerUser(users, usersPath));
  app.post('/register', registerUser(users, usersPath));

  app.get('/login', loginHandler(sessions))
  app.post('/login', loginHandler(sessions))
  app.get('/logout', logoutHandler(sessions));
  app.use(authenticate(users));


  app.use(express.static('public'));

  app.get('/guest-book', guestBookRouter(guestBook, template, commentsPath));
  app.post('/add-comment', guestBookRouter(guestBook, template, commentsPath));

  app.get('/api/guest-book', handleApiRouter(guestBook));

  app.post(uploadFileHandler);

  return app;
}


const commentsPath = './data/comments.json';
const templatePath = './templates/guestBook.html';
const usersPath = './data/users.json'

app = createApp(commentsPath, templatePath, usersPath, sessions = {});

module.exports = { app };
