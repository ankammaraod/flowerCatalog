const injectSession = (sessions) => {
  return (request, response, next) => {
    if (!request.cookies.id) {
      next();
      return;
    }
    request.session = sessions[request.cookies.id];
    next();
  }
}
module.exports = { injectSession };