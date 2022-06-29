const { fileNotFoundHandler } = require('./handlers/fileNotFoundHandler.js');
const { serveFileContent } = require('./handlers/serveFileContent.js');
const { handleGuestBook } = require('./handlers/handleGuestBook.js');
const { createRouter } = require('./server/createRouter.js');
const fs = require('fs');

const readData = (path) => {
  return fs.readFileSync(path, 'utf-8');
};

const initializePathsAndHandlers = (commentsPath, templatePath) => {

  const guestBook = JSON.parse(readData(commentsPath));
  const template = readData(templatePath);

  const handlers = [
    handleGuestBook(guestBook, template, commentsPath),
    serveFileContent('./public'),
    fileNotFoundHandler
  ];

  return createRouter(handlers);
};

module.exports = { initializePathsAndHandlers };
