const fs = require('fs');

const path = require('path');

const contentTypes = {
  '.jpeg': 'image/jpeg',
  '.html': 'text/html'
};

const determineContentType = (fileName) => {
  const fileExtension = path.extname(fileName);
  return contentTypes[fileExtension] || 'text/plain';
};

const serveAsyncFileHandler = (path) => {

  return (request, response, next) => {

    const { pathname } = request.url;
    let fileName = path + pathname;

    if (pathname === '/') {
      fileName = path + pathname + 'flowerCatlog.html';
    }


    if (!fs.existsSync(fileName)) {
      next();
      return;
    }

    fs.readFile(fileName, (error, content) => {
      if (error) {
        next();
        return;
      }
      response.setHeader('content-type', determineContentType(fileName));
      response.end(content);
    });
  };
}
module.exports = { serveAsyncFileHandler };