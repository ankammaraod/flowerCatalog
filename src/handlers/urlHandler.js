const urlHandler = (request, response) => {
  request.url = new URL(request.url, 'https://' + request.headers.host);
  return false;
};

module.exports = { urlHandler };