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

const initializePathsAndHandlers = () => {
  const commentsPath = './public/comments.json';
  const templatePath = './public/guestBook.html'
  const guestBook = JSON.parse(fs.readFileSync(commentsPath, 'utf-8'));

  const handlers = [
    serveFileContent('./public'),
    handleGuestBook(guestBook, commentsPath, templatePath),
    fileNotFoundHandler
  ];

  return handle(handlers);
};

module.exports = { initializePathsAndHandlers };

//pass the paths from command line