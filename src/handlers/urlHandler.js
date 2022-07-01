const urlHandler = (request, response, next) => {
  request.url = new URL(request.url, 'https://' + request.headers.host);
  next(request, response, next);
};

module.exports = { urlHandler };