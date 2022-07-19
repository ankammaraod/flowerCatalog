const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

const {
  authenticate,
  loginHandler,
  logoutHandler,
  uploadFileHandler,
  serveUploadFile,
  readBodyParams,
  readBody,
  logRequestHandler,
  handleApiRouter,
  handleAddComment,
  serveGuestBook,
  registerUser,
  protectionHandler,
  redirectToLogin,
  redirectToRegister,
  injectSession,

} = require('./handlers/handlers.js')


const readData = (path) => {
  return fs.readFileSync(path, 'utf-8');
};

const createLoginRouter = (sessions, users) => {
  const loginRouter = express.Router();
  loginRouter.get('/', redirectToLogin);
  loginRouter.post('/', loginHandler(sessions));
  loginRouter.post('/', authenticate(users));
  return loginRouter;
};

const createSignUpRouter = (users, usersPath) => {
  const signUpRouter = express.Router();
  signUpRouter.get('/', redirectToRegister);
  signUpRouter.post('/', registerUser(users, usersPath));
  return signUpRouter;
};


const createApp = (commentsPath, templatePath, usersPath, sessions) => {
  const comments = JSON.parse(readData(commentsPath));
  const template = readData(templatePath);
  const users = JSON.parse(readData(usersPath));

  const app = express();


  const loginRouter = createLoginRouter(sessions, users);
  const signUpRouter = createSignUpRouter(users, usersPath);

  app.use(express.urlencoded(
    { extended: true }
  ));

  app.use(cookieParser());

  app.use(readBodyParams)
  app.use(readBody)

  app.use(cookieSession({
    name: 'session',
    keys: ['someKey']
  }));


  app.use(morgan('tiny', { stream: fs.createWriteStream('./log.txt') }))

  app.use('/register', signUpRouter);


  app.get('/login', redirectToLogin);
  app.post('/login', loginHandler());
  app.post('/login', authenticate(users));

  app.get('/logout', logoutHandler());

  app.use(protectionHandler);

  app.use(express.static('public'));

  app.get('/guest-book', serveGuestBook(comments, template));
  app.post('/add-comment', handleAddComment(comments, commentsPath));

  app.get('/api/guest-book', handleApiRouter(comments));

  app.get('/upload-file', serveUploadFile);
  app.post('/upload-file', uploadFileHandler);

  return app;
}


const commentsPath = './data/comments.json';
const templatePath = './templates/guestBook.html';
const usersPath = './data/users.json'

app = (sessions = {}) => createApp(commentsPath, templatePath, usersPath, sessions);

module.exports = { app };
