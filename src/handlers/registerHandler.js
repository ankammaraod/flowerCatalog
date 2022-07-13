const fs = require('fs');
const writeData = (path, content) => {
  fs.writeFileSync(path, JSON.stringify(content, 'utf-8'));
};

const registerUser = (users, usersPath) => {
  return (request, response, next) => {
    const { pathname } = request.url;
    const { method } = request;

    if (pathname !== '/register') {
      next();
      return;
    }

    if (method === 'POST') {
      const { username } = request.bodyParams;

      if (username) {
        users.push(username);
        writeData(usersPath, users);
        console.log(users);
        response.statusCode = 201;
        response.end('registered successfully');
        return;
      }
      response.end();
    }

    if (method === 'GET') {
      response.statusCode = 302;
      response.setHeader('location', '/register.html');
      response.end();
      return;
    }
    next()
  };

};

module.exports = { registerUser };