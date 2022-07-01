const timeoutHandler = (request, response, next) => {
  const { pathname } = request.url;
  console.log(pathname);
  if (pathname === '/timeout') {
    setTimeout(() => {
      response.end('hai');
    }, 5000);
    return;
  }
  next(request, response, next)
};

module.exports = { timeoutHandler };