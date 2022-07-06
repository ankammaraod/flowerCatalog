const parseData = (data, request, next) => {
  const urlSearchParams = new URLSearchParams(data);
  const params = urlSearchParams.entries();
  const bodyParams = {}
  for (const param of params) {
    const [key, value] = param;
    bodyParams[key] = value;
  }
  request.bodyParams = bodyParams;
  next();
};

const readAsyncDataHandler = (request, response, next) => {
  if (request.method === 'POST') {
    request.setEncoding('utf-8');
    let data = '';
    request.on('data', chunk => data += chunk);
    request.on('end', () => {
      parseData(data, request, next);
    });
  }
  next();
};

module.exports = { readAsyncDataHandler };