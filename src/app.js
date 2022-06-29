const { fileNotFoundHandler } = require('./handlers/fileNotFoundHandler.js');
const { serveFileContent } = require('./handlers/serveFileContent.js');
const { handleGuestBook } = require('./handlers/handleGuestBook.js');
const fs = require('fs');

const handle = (handlers) => {
  return (request, response) => {
    for (const handler of handlers) {
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  }
};

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

  return handle(handlers);
};

module.exports = { initializePathsAndHandlers };

//pass the paths from command line