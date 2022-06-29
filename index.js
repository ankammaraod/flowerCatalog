const { startServer } = require('./src/server/server.js');
const { initializePathsAndHandlers } = require('./src/app.js');

const main = () => {
  startServer(9000, initializePathsAndHandlers());
};

module.exports = { main };