const fs = require('fs');
const writeData = (path, content) => {
  fs.writeFileSync(path, JSON.stringify(content, 'utf-8'));
};

const handleUsers = (response, username, users, usersPath) => {
  console.log(users.includes(username))
  response.setHeader('content-type', 'text/plain');

  if (!users.includes(username)) {
    users.push(username);
    writeData(usersPath, users);
    response.statusCode = 201;
    response.end();
    return;
  }
  response.statusCode = 403;
  response.end();
}

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
        handleUsers(response, username, users, usersPath)
        console.log(users);
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