const { fileNotFoundHandler } = require('./fileNotFoundHandler.js');
const { serveGuestBook, handleAddComment } = require('./handleGuestBook.js');
const { loginHandler, redirectToLogin } = require('./loginHandler.js');
const { logRequestHandler } = require('./logRequestHandler.js');
const { handleApiRouter } = require('./handleApi.js');
const { readBodyParams } = require('./readBodyParamsHandler.js');
const { injectCookie } = require('./injectCookieHandler.js')
const { injectSession } = require('./injectSessionHandler');
const { uploadFileHandler, serveUploadFile } = require('./uploadFileHandler.js');
const { readBody } = require('./parseBodyHandler.js');
const { authenticate } = require('./authenticationHandler');
const { registerUser, redirectToRegister } = require('./registerHandler.js');
const { logoutHandler } = require('./logoutHandler.js');
const { protectionHandler } = require('./protectionHandler.js');

module.exports = {
  readBody,
  readBodyParams,
  injectCookie,
  injectSession,
  logRequestHandler,
  loginHandler,
  handleApiRouter,
  fileNotFoundHandler,
  uploadFileHandler,
  authenticate,
  registerUser,
  logoutHandler,
  protectionHandler,
  redirectToLogin,
  redirectToRegister,
  serveGuestBook,
  handleAddComment,
  serveUploadFile,
}