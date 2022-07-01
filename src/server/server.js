const http = require('http');

const startServer = (port, handler) => {
  const server = http.createServer(handler);
  server.listen(port, () => console.log(`server listening on ${port}`));
};

module.exports = { startServer };
