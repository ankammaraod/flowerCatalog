const readBodyParams = (request, response, next) => {
  request.bodyParams = request.body;
  next();
};

module.exports = { readBodyParams };