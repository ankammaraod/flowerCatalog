const fileNotFoundHandler = (request, response) => {
  response.statusCode = 404;
  console.log('inside file not found handler')
  response.setHeader('content-type', 'text/plain');
  response.end('file not found');
};

module.exports = { fileNotFoundHandler };