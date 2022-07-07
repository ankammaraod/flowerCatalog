const parseCookies = (request, response) => {
  const cookies = {};
  const stringCookies = request.headers.cookie;
  if (!stringCookies) {
    return cookies;
  }
  stringCookies.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookies[name] = value;
  })
  return cookies;
};

const injectCookie = (request, response, next) => {
  request.cookies = parseCookies(request, response);
  next();
};

module.exports = { injectCookie };
