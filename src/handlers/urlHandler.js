const urlHandler = (request, response, next) => {
  request.url = new URL(request.url, 'https://' + request.headers.host);
  next();
};

module.exports = { urlHandler };