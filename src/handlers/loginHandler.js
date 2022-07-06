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


// const parseData = (data, request) => {
//   const urlSearchParams = new URLSearchParams(data);
//   const params = urlSearchParams.entries();
//   const bodyParams = {}
//   for (const param of params) {
//     const [key, value] = param;
//     bodyParams[key] = value;
//   }
//   request.bodyParams = bodyParams;
//   return;
// };

const handleLogin = (request, response) => {
  response.setHeader('Set-cookie', 'id=1');
  response.statusCode = 302;
  response.setHeader('Location', '/');
  response.end();
};

const loginHandler = (request, response, next) => {
  const { pathname } = request.url;

  if (pathname === '/login') {
    if (request.method === 'POST') {
      handleLogin(request, response);
      return;
    }
    response.setHeader('Content-type', 'text/html');
    response.end(page);
    return;
  }
  if (!request.cookies.id) {
    response.setHeader('Content-type', 'text/html');
    response.end(page);
    return;
  }
  next();
};

module.exports = { loginHandler };