const fs = require('fs');

const contentTypes = {
  jpeg: 'image/jpeg',
  html: 'text/html'
};

const determineContentType = (fileName) => {
  const filetype = fileName.slice(fileName.lastIndexOf('.') + 1);
  return contentTypes[filetype] || 'text/plain';
};

const serveFileContent = (path) => {
  return (request, response) => {
    const { pathname } = request.url

    let fileName = path + pathname;

    if (pathname === '/') {
      fileName = path + pathname + 'flowerCatlog.html';
    }

    if (!fs.existsSync(fileName)) {
      return false;
    }

    const content = fs.readFileSync(fileName);
    response.setHeader('content-type', determineContentType(fileName));
    response.end(content);
    return true;
  }
};

module.exports = { serveFileContent };
