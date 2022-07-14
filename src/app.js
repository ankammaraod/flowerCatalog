const {
  urlHandler,
  readBodyParams,
  readBody,
  injectCookie,
  injectSession,
  logRequestHandler,
  loginHandler,
  handleApiRouter,
  guestBookRouter,
  uploadFileHandler,
  serveAsyncFileHandler,
  fileNotFoundHandler,
  createRouter,
  authenticate,
  registerUser,

} = require('./handlers/handlers.js');

const fs = require('fs');
const { logoutHandler } = require('./handlers/logoutHandler.js');

const readData = (path) => {
  return fs.readFileSync(path, 'utf-8');
};

const configuration = (commentsPath, templatePath, usersPath, sessions) => {

  const users = JSON.parse(readData(usersPath));
  const guestBook = JSON.parse(readData(commentsPath));
  const template = readData(templatePath);

  const handlers = [
    // urlHandler,
    readBodyParams,
    readBody,
    injectCookie,
    injectSession(sessions),
    logRequestHandler,
    registerUser(users, usersPath),
    authenticate(users),
    loginHandler(sessions),
    logoutHandler(sessions),
    handleApiRouter(guestBook),
    guestBookRouter(guestBook, template, commentsPath),
    uploadFileHandler,
    serveAsyncFileHandler('./public'),
    fileNotFoundHandler
  ];

  return createRouter(handlers);
};

// const sessions = {};
const commentsPath = './data/comments.json';
const templatePath = './templates/guestBook.html';
const usersPath = './data/users.json'
// const users = ['ankammarao'];

const app = (sessions = {}) => configuration(commentsPath, templatePath, usersPath, sessions);

module.exports = { app };