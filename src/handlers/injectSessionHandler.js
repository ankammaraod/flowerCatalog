const injectSession = (sessions) => {
  return (request, response, next) => {
    if (!request.session.populated) {
      next();
      return;
    }
    request.session = sessions[request.cookies.id];
    next();
  }
}
module.exports = { injectSession };