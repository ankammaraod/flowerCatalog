const { createServer } = require('net');

const { parseChunk } = require("./parseRequest.js");
const { Response } = require('./response.js');


const onData = (chunk, handler, response) => {

  const { requestLine, headers } = parseChunk(chunk);

  console.log(new Date(), requestLine.method, requestLine.uri);
  handler({ ...requestLine, headers }, response);

  return false;
};

const onNewConnection = (socket, handler) => {
  const response = new Response(socket);
  socket.on('error', (err) => console.error(err.message));
  socket.on('data', (chunk) => onData(chunk, handler, response));
};


const startServer = (PORT, handler) => {

  const server = createServer((socket) =>
    onNewConnection(socket, handler));

  server.listen(PORT, () => console.log(`listening on ${PORT}`));
};

module.exports = { startServer, onNewConnection, onData };
