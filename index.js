const { startServer } = require('./src/server/server.js');
const { app } = require('./src/app.js');

const main = () => {
  startServer(9000, app);
};

main();
