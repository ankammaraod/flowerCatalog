const logRequestHandler = (request, response, next) => {
  console.log(request.method, request.url);
  next();
};

module.exports = { logRequestHandler };