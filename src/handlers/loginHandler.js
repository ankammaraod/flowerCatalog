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

    if (request.method === 'GET' && !request.session) {
      redirectLogin(request, response, next);
      return;
    }

    if (request.method === 'POST') {
      const session = createSession(request, response);
      sessions[session.id] = session;

      response.setHeader('Set-cookie', `id=${session.id}`);
      next()
      return;
    }
  };
}

module.exports = { loginHandler };