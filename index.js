const { startServer } = require('./src/server/server.js');
// const { startServer } = require('server');
const { initializePathsAndHandlers } = require('./src/app.js');

const main = () => {
  const commentsPath = './data/comments.json';
  const templatePath = './templates/guestBook.html';
  startServer(9000, initializePathsAndHandlers(commentsPath, templatePath));
};

main();
