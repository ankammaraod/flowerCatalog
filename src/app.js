const { fileNotFoundHandler } = require('./handlers/fileNotFoundHandler.js');
const { serveFileContent } = require('./handlers/serveFileContent.js');
const { guestBookRouter } = require('./handlers/handleGuestBook.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { createRouter } = require('./server/createRouter.js');
const { logRequestHandler } = require('./handlers/logRequestHandler.js');
const { urlHandler } = require('./handlers/urlHandler.js');
const { handleApiRouter } = require('./handlers/handleApi.js');
const { timeoutHandler } = require('./handlers/timeoutHandler.js');
const { serveAsyncFileHandler } = require('./handlers/serveAsyncFileHandler.js');
const fs = require('fs');
const { request } = require('http');

const readData = (path) => {
  return fs.readFileSync(path, 'utf-8');
};


const parseCookies = (request, response) => {
  const cookies = {};
  const stringCookies = request.headers.cookie;
  if (!stringCookies) {
    return cookies;
  }
  stringCookies.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookies[name] = value;
  })
  return cookies;
};

const injectCookie = (request, response, next) => {
  request.cookies = parseCookies(request, response);
  next();
};


const initializePathsAndHandlers = (commentsPath, templatePath) => {
  const guestBook = JSON.parse(readData(commentsPath));
  const template = readData(templatePath);

  const handlers = [
    urlHandler,
    injectCookie,
    logRequestHandler,
    loginHandler,
    handleApiRouter(guestBook),
    guestBookRouter(guestBook, template, commentsPath),
    serveAsyncFileHandler('./public'),
    fileNotFoundHandler
  ];

  return createRouter(handlers);
};

module.exports = { initializePathsAndHandlers };