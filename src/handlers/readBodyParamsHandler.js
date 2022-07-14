const parseParams = (data) => {
  const urlSearchParams = new URLSearchParams(data);
  const params = urlSearchParams.entries();
  const bodyParams = {}
  for (const param of params) {
    const [key, value] = param;
    bodyParams[key] = value;
  }
  return bodyParams;
};

const readBodyParams = (request, response, next) => {
  if (request.method !== 'POST') {
    next();
    return;
  }
  const contentType = request.headers['content-type'];

  if (!contentType.startsWith('application/x-www-form-urlencoded')) {
    next();
    return;
  }
  request.bodyParams = request.body;

  // let data = '';
  // request.on('data', chunk => data += chunk);
  // request.on('end', () => {
  // request.bodyParams = parseParams(data);
  next();
  // });
};

module.exports = { readBodyParams };