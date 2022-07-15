const fs = require('fs');
const writeData = (path, content) => {
  fs.writeFileSync(path, JSON.stringify(content, 'utf-8'));
};

const handleUsers = (response, username, users, usersPath) => {
  response.setHeader('content-type', 'text/plain');

  if (!users.includes(username)) {
    users.push(username);
    writeData(usersPath, users);
    response.status(201);
    response.end();
    return;
  }
  response.status(403);
  response.end();
}

const registerUser = (users, usersPath) => {
  return (request, response, next) => {

    const { username } = request.bodyParams;

    if (username) {
      handleUsers(response, username, users, usersPath);
      return;
    }
    response.end();
  };

};


const redirectToRegister = (request, response, next) => {
  response.redirect('/register.html');
  response.end();
  return;
}

module.exports = { registerUser, redirectToRegister };