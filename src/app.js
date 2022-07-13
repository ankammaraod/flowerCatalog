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
  createRouter

} = require('./handlers/handlers.js');

const fs = require('fs');
const { logoutHandler } = require('./handlers/logoutHandler.js');

const readData = (path) => {
  return fs.readFileSync(path, 'utf-8');
};

const sessions = {};

const configuration = () => {
  const commentsPath = './data/comments.json';
  const templatePath = './templates/guestBook.html';

  const guestBook = JSON.parse(readData(commentsPath));
  const template = readData(templatePath);

  const handlers = [
    urlHandler,
    readBodyParams,
    readBody,
    injectCookie,
    injectSession(sessions),
    logRequestHandler,
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

const app = configuration();

module.exports = { app };