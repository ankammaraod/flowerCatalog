const { fileNotFoundHandler } = require('./fileNotFoundHandler.js');
const { serveFileContent } = require('./serveFileContent.js');
const { guestBookRouter } = require('./handleGuestBook.js');
const { loginHandler } = require('./loginHandler.js');
const { createRouter } = require('../server/createRouter.js');
const { logRequestHandler } = require('./logRequestHandler.js');
const { urlHandler } = require('./urlHandler.js');
const { handleApiRouter } = require('./handleApi.js');
const { timeoutHandler } = require('./timeoutHandler.js');
const { serveAsyncFileHandler } = require('./serveAsyncFileHandler.js');
const { readBodyParams } = require('./readBodyParamsHandler.js');
const { injectCookie } = require('./injectCookieHandler.js')

module.exports = {
  urlHandler,
  readBodyParams,
  injectCookie,
  logRequestHandler,
  loginHandler,
  handleApiRouter,
  guestBookRouter,
  serveAsyncFileHandler,
  fileNotFoundHandler,
  createRouter
}