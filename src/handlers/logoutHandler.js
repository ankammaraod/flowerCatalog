const logoutHandler = (sessions) => {
  return (request, response, next) => {
    const { pathname } = request.url;
    if (pathname === '/logout') {
      const { id } = request.cookies;
      delete sessions[id];
      response.setHeader('Set-cookie', 'id=0;Max-Age=0');
      response.setHeader('content-type', 'text/plain');
      response.end('you are logged out');
      return;
    }
    next();
  };
}
module.exports = { logoutHandler };