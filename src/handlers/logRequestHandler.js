const logRequestHandler = (request, response, next) => {
  console.log(request.method, request.url.pathname);
  next(request, response, next);
};

module.exports = { logRequestHandler };