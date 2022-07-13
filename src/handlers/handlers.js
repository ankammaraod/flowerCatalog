const { fileNotFoundHandler } = require('./fileNotFoundHandler.js');
const { serveFileContent } = require('./serveFileContent.js');
const { guestBookRouter } = require('./handleGuestBook.js');
const { loginHandler } = require('./loginHandler.js');
const { createRouter } = require('../server/createRouter.js');
const { logRequestHandler } = require('./logRequestHandler.js');
const { urlHandler } = require('./urlHandler.js');
const { handleApiRouter } = require('./handleApi.js');
const { serveAsyncFileHandler } = require('./serveAsyncFileHandler.js');
const { readBodyParams } = require('./readBodyParamsHandler.js');
const { injectCookie } = require('./injectCookieHandler.js')
const { injectSession } = require('./injectSessionHandler');
const { uploadFileHandler } = require('./uploadFileHandler.js');
const { readBody } = require('./parseBodyHandler.js');
const { authenticate } = require('./authenticationHandler');
const { registerUser } = require('./registerHandler.js');

let id = 0;
const addId = (req, res, next) => {
  req.id = id++;
  next();
}

const debug = (msg) => (req, res, next) => {
  console.log("DEBUG: ", msg, req.id, req.url, req.method);
  next();
};


module.exports = {
  readBody,
  createRouter,
  urlHandler,
  readBodyParams,
  injectCookie,
  injectSession,
  logRequestHandler,
  loginHandler,
  handleApiRouter,
  guestBookRouter,
  serveAsyncFileHandler,
  fileNotFoundHandler,
  uploadFileHandler,
  authenticate,
  registerUser
}