const authenticate = (users) => {
  return (request, response, next) => {
    const pathname = request.url;
    if (pathname !== '/login' || request.method !== 'POST') {
      next();
      return;
    }

    const { username } = request.bodyParams;

    if (!users.includes(username)) {
      response.statusCode(401);
      response.end();
      return;
    }
    next();
  };
};

module.exports = { authenticate };