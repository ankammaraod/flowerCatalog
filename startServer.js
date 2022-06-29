const { startServer } = require('./src/server/server.js');
const { handle, handlers } = require('./src/app.js');

startServer(9000, handle(handlers));