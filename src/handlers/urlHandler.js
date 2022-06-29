const urlHandler = (request, response) => {
  request.url = new URL(request.url, 'http://' + request.headers.host);
  return false;
};

module.exports = { urlHandler };