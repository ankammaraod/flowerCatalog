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
    console.log(request.body);
    response.end('files Uploaded');
    return;
  }
  next();
};

module.exports = { uploadFileHandler };
