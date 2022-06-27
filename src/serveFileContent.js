const fs = require('fs');

const contentTypes = {
  jpeg: 'image/jpeg',
  html: 'text/html'
};

const determineContentType = (fileName) => {
  const filetype = fileName.slice(fileName.lastIndexOf('.') + 1);
  return contentTypes[filetype] || 'text/plain';
};

const serverFileContent = (request, response, path) => {
  const { uri } = request;
  let fileName = path + uri;

  if (!fs.existsSync(fileName)) {
    return false;
  }

  const content = fs.readFileSync(fileName);
  response.send(content);
  response.setHeader('content-type', determineContentType(fileName));
  return true;

};

module.exports = { serverFileContent };
