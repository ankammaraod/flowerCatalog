const uploadFileHandler = (request, response, next) => {
  const { pathname } = request.url;
  const { method } = request;

  if (pathname === '/upload-file' && method === 'GET') {
    response.statusCode = 302;
    response.setHeader('location', '/fileUpload.html')
    response.end();
    return;
  }

  if (pathname === '/upload-file' && method === 'POST') {
    // const parsedContent = parseBody(request);
    console.log(request.body);
    response.end();
    return;
  }
  next();
};

module.exports = { uploadFileHandler };
