const createSession = (request, response) => {
  const { username } = request.bodyParams;
  return { id: new Date().getTime(), username };
};

const loginHandler = (sessions) => {
  return (request, response, next) => {

    const session = createSession(request, response);

    // sessions[session.id] = session;
    request.session = session;

    next();
    return;
  };
};


const redirectToLogin = (request, response, next) => {
  if (!request.session.isPopulated) {

    response.redirect('/login.html');
    response.end();
    return;
  }
}

module.exports = { loginHandler, redirectToLogin };