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
</body>
</html>`

const handleLogin = (request, response) => {
  response.setHeader('Set-cookie', `id=${new Date().getTime()}`);
  response.statusCode = 302;
  response.setHeader('Location', '/flowerCatlog.html');
  response.end();
};

const loginHandler = (request, response, next) => {
  const { pathname } = request.url;

  if (pathname === '/login' && request.method === 'POST') {
    handleLogin(request, response);
    return;
  }

  if (pathname === '/login' && request.method === 'GET') {
    response.setHeader('Content-type', 'text/html')
    response.end(page);
    return;
  }

  if (!request.cookies.id) {
    response.setHeader('Content-type', 'text/plain');
    response.end('access denied');
    return;
  }

  next();
};

module.exports = { loginHandler };