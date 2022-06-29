const urlHandler = (request, response) => {
  const { port } = request
  request.url = new URL(`http://localhost:${port}${request.url}`);
  return false;
};

module.exports = { urlHandler };