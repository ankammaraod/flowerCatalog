const { startServer } = require('./src/server.js');

const { serverFileContent } = require('./src/serveFileContent.js');
const { handleGuestBook } = require('./src/handleGuestBook.js');
const handle = (handlers, path = './public') => {
  return (request, response, Comments) => {
    for (const handler of handlers) {
      if (handler(request, response, path, Comments)) {
        return true;
      }
    }
    return false;
  }
};

const handlers = [serverFileContent, handleGuestBook];

startServer(9000, handle(handlers, ...process.argv.slice(2)));