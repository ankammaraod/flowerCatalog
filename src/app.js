const { fileNotFoundHandler } = require('./handlers/fileNotFoundHandler.js');
const { serveFileContent } = require('./handlers/serveFileContent.js');
const { guestBookRouter } = require('./handlers/handleGuestBook.js');
// const { createRouter } = require('server');
const { createRouter } = require('./server/createRouter.js');
const { logRequestHandler } = require('./handlers/logRequestHandler.js');
const { urlHandler } = require('./handlers/urlHandler.js');
const { handleApiRouter } = require('./handlers/handleApi.js');
const { timeoutHandler } = require('./handlers/timeoutHandler.js');
const { serveAsyncFileHandler } = require('./handlers/serveAsyncFileHandler.js');
const fs = require('fs');

const readData = (path) => {
  return fs.readFileSync(path, 'utf-8');
};


const initializePathsAndHandlers = (commentsPath, templatePath) => {

  const guestBook = JSON.parse(readData(commentsPath));
  const template = readData(templatePath);

  const handlers = [
    urlHandler,
    logRequestHandler,
    handleApiRouter(guestBook),
    guestBookRouter(guestBook, template, commentsPath),
    serveAsyncFileHandler('./public'),
    //   serveFileContent('./public'),
    fileNotFoundHandler
  ];

  // const handlers = [serveAsyncFileHandler('./public'), timeoutHandler, fileNotFoundHandler];
  return createRouter(handlers);
};

module.exports = { initializePathsAndHandlers };