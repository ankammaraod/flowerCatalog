const page = `<html>
<head>
  <title>Flower catalog</title>
</head>

<body>
  <h1>Flower Catalog</h1>

  <h2>Login</h2>

  <form action="/login" method="post">
    <div>
      <label for="username">Username</label>
      <input type="text" name="username" id="username">
    </div>
    <input type="submit" value="submit">
  </form>
  <a href='/register'>register</a>
</body>
</html>`

const redirectLogin = (request, response, next) => {
  response.redirect('/login.html');
  response.end();
};

const createSession = (request, response) => {
  const { username } = request.bodyParams;
  return { id: new Date().getTime(), username };
};


const loginHandler = (sessions) => {
  return (request, response, next) => {
    const pathname = request.url;

    if (pathname === '/login' && request.method === 'GET' && !request.session) {
      redirectLogin(request, response, next);
      return;
    }

    if (pathname === '/login' && request.method === 'POST') {
      const session = createSession(request, response);
      sessions[session.id] = session;

      response.setHeader('Set-cookie', `id=${session.id}`);

      // response.redirect('/flowerCatlog.html');
      // response.end();
      next()
      return;
    }

    const routes = ['/register.html', '/scripts/registerUser.js',
      '/login.html', '/scripts/loginUser.js'];

    if (routes.includes(pathname)) {
      next();
      return;
    }

    if (!request.cookies.id || !request.session) {
      redirectLogin(request, response, next);
      return;
    }

    next();
  };
}

module.exports = { loginHandler, page };