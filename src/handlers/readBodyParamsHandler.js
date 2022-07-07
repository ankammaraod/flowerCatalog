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
  request.setEncoding('utf-8');
  let data = '';
  request.on('data', chunk => data += chunk);
  request.on('end', () => {
    request.bodyParams = parseParams(data);
    next();
  });
};

module.exports = { readBodyParams };