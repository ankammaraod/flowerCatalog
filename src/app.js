const {
  urlHandler,
  readBodyParams,
  injectCookie,
  injectSession,
  logRequestHandler,
  loginHandler,
  handleApiRouter,
  guestBookRouter,
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

const initializePathsAndHandlers = (commentsPath, templatePath) => {
  const guestBook = JSON.parse(readData(commentsPath));
  const template = readData(templatePath);

  const handlers = [
    urlHandler,
    readBodyParams,
    injectCookie,
    injectSession(sessions),
    logRequestHandler,
    loginHandler(sessions),
    logoutHandler(sessions),
    handleApiRouter(guestBook),
    guestBookRouter(guestBook, template, commentsPath),
    serveAsyncFileHandler('./public'),
    fileNotFoundHandler
  ];

  return createRouter(handlers);
};

module.exports = { initializePathsAndHandlers };