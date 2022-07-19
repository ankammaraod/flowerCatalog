const redirectLogin = (request, response, next) => {
  response.redirect('/login.html');
  response.end();
};


const protectionHandler = (request, response, next) => {

  const routes = ['/register.html', '/scripts/registerUser.js',
    '/login.html', '/scripts/loginUser.js'];

  const pathname = request.url;
  if (routes.includes(pathname)) {
    next();
    return;
  }

  if (!request.session.isPopulated) {
    redirectLogin(request, response, next);
    return;
  }
  next()
};

module.exports = { protectionHandler };