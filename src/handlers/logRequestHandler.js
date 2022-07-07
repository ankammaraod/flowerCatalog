const logRequestHandler = (request, response, next) => {
  console.log(request.method, request.url.pathname, request.session, request.cookies);
  next();
};

module.exports = { logRequestHandler };