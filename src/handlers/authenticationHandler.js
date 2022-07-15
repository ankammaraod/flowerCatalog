const authenticate = (users) => {
  return (request, response, next) => {
    console.log('in authenticate handler', users)

    const pathname = request.url;
    if (pathname !== '/login') {
      next();
      return;
    }

    const { username } = request.bodyParams;
    console.log(users, username);
    if (!users.includes(username)) {
      response.status(401);
      response.end();
      return;
    }
    response.redirect('/flowerCatlog.html');
    response.end();
    return;
  };
};

module.exports = { authenticate };