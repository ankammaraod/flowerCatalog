const fileNotFoundHandler = (request, response) => {
  response.statusCode = 404;

  response.setHeader('content-type', 'text/plain');
  response.end('file not found');
};

module.exports = { fileNotFoundHandler };