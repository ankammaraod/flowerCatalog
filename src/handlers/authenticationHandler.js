const authenticate = (users) => {
  return (request, response, next) => {
    const { username } = request.bodyParams;
    if (!users.includes(username)) {
      response.status(401);
      response.end();
      return;
    }
    response.redirect('/index.html');
    response.end();
    return;
  };
};

module.exports = { authenticate };