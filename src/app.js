const {
  urlHandler,
  readBodyParams,
  injectCookie,
  logRequestHandler,
  loginHandler,
  handleApiRouter,
  guestBookRouter,
  serveAsyncFileHandler,
  fileNotFoundHandler,
  createRouter
} = require('./handlers/handlers.js');

const fs = require('fs');

const readData = (path) => {
  return fs.readFileSync(path, 'utf-8');
};

let id = 0;
const addId = (req, res, next) => {
  req.id = id++;
  next();
}

const debug = (msg) => (req, res, next) => {
  console.log("DEBUG: ", msg, req.id, req.url, req.method);
  next();
};

const initializePathsAndHandlers = (commentsPath, templatePath) => {
  const guestBook = JSON.parse(readData(commentsPath));
  const template = readData(templatePath);

  const handlers = [
    addId,
    urlHandler,
    debug("after uriHandler"),
    logRequestHandler,
    debug("after logRequestHandler"),
    readBodyParams,
    debug("after readBodyParams"),
    injectCookie,
    debug("after injectCookie"),
    loginHandler,
    debug("after loginHandler"),
    handleApiRouter(guestBook),
    guestBookRouter(guestBook, template, commentsPath),
    serveAsyncFileHandler('./public'),
    debug("after serveAsyncFileHandler"),
    fileNotFoundHandler
  ];

  return createRouter(handlers);
};

module.exports = { initializePathsAndHandlers };