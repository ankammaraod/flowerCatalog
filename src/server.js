const { createServer } = require('net');
const { Comments } = require('../src/handleGuestBook.js');
const { parseChunk } = require("./parseRequest.js");
const { Response } = require('./response.js');


const onData = (chunk, handler, response, comments) => {
  console.log(comments);
  const { requestLine, headers } = parseChunk(chunk);

  console.log(new Date(), requestLine.method, requestLine.uri);
  handler({ ...requestLine, headers }, response, comments);

  return false;
};

const onNewConnection = (socket, handler, comments) => {
  const response = new Response(socket);
  socket.on('error', (err) => console.error(err.message));
  socket.on('data', (chunk) => onData(chunk, handler, response, comments));
};


const startServer = (PORT, handler) => {
  const comments = new Comments();
  const server = createServer((socket) =>
    onNewConnection(socket, handler, comments));

  server.listen(PORT, () => console.log(`listening on ${PORT}`));
};

module.exports = { startServer, onNewConnection, onData };
