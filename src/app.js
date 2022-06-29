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

const guestBook = JSON.parse(fs.readFileSync('./public/comments.json', 'utf-8'));

const handlers = [serveFileContent('./public'), handleGuestBook(guestBook), fileNotFoundHandler];

module.exports = { handle, handlers };