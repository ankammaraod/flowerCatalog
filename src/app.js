const { fileNotFoundHandler } = require('./handlers/fileNotFoundHandler.js');
const { serveFileContent } = require('./handlers/serveFileContent.js');
const { guestBookRouter } = require('./handlers/handleGuestBook.js');
const { createRouter } = require('./server/createRouter.js');
const { logRequestHandler } = require('./handlers/logRequestHandler.js');
const { urlHandler } = require('./handlers/urlHandler.js');
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
    guestBookRouter(guestBook, template, commentsPath),
    serveFileContent('./public'),
    fileNotFoundHandler
  ];

  return createRouter(handlers);
};

module.exports = { initializePathsAndHandlers };
