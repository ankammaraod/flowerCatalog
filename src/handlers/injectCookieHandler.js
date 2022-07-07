const parseCookies = (stringCookies) => {
  const cookies = {};
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
  request.cookies = parseCookies(request.headers.cookie);
  next();
};

module.exports = { injectCookie };
