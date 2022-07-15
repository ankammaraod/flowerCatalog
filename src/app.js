const express = require('express');
const fs = require('fs');

const {
  authenticate,
  injectSession,
  injectCookie,
  loginHandler,
  logoutHandler,
  uploadFileHandler,
  readBodyParams,
  readBody,
  logRequestHandler,
  handleApiRouter,

  guestBookRouter,

  registerUser,
  protectionHandler,
  redirectToLogin,
  redirectToRegister,

} = require('./handlers/handlers.js')


const readData = (path) => {
  return fs.readFileSync(path, 'utf-8');
};

const createApp = (commentsPath, templatePath, usersPath, sessions) => {
  const comments = JSON.parse(readData(commentsPath));
  const template = readData(templatePath);
  const users = JSON.parse(readData(usersPath));

  const app = express();
  const loginRouter = express.Router();
  loginRouter.get('/', redirectToLogin)
  loginRouter.post('/', loginHandler(sessions))
  loginRouter.post('/', authenticate(users));

  const signUpRouter = express.Router();
  signUpRouter.get('/', redirectToRegister);
  signUpRouter.post('/', registerUser(users, usersPath));


  app.use(express.urlencoded(
    { extended: true }
  ));

  app.use(readBodyParams);
  app.use(readBody);
  app.use(injectCookie);
  app.use(injectSession(sessions));
  app.use(logRequestHandler);

  app.use('/register', signUpRouter)

  app.use('/login', loginRouter)
  app.get('/logout', logoutHandler(sessions));


  app.use(protectionHandler)
  app.use(express.static('public'));

  app.get('/guest-book', guestBookRouter(comments, template, commentsPath));
  app.post('/add-comment', guestBookRouter(comments, template, commentsPath));

  app.get('/api/guest-book', handleApiRouter(comments));

  app.get('/upload-file', uploadFileHandler);
  app.post('/upload-file', uploadFileHandler);

  return app;
}


const commentsPath = './data/comments.json';
const templatePath = './templates/guestBook.html';
const usersPath = './data/users.json'

app = (sessions = {}) => createApp(commentsPath, templatePath, usersPath, sessions);

module.exports = { app };
