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

  let data = [];
  request.on('data', chunk => data.push(chunk));
  request.on('end', () => {
    request.body = data;
    next();
  });
};

module.exports = { readBodyParams };