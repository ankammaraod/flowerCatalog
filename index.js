const { startServer } = require('./src/server/server.js');
const { initializePathsAndHandlers } = require('./src/app.js');

startServer(9000, initializePathsAndHandlers());
