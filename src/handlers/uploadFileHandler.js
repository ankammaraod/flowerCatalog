const uploadFileHandler = (request, response, next) => {
  const pathname = request.url;
  const { method } = request;

  if (pathname === '/upload-file' && method === 'GET') {
    response.statusCode = 302;
    response.setHeader('location', '/fileUpload.html')
    response.send();
    return;
  }

  if (pathname === '/upload-file' && method === 'POST') {
    console.log(request.body);
    response.send('files Uploaded');
    return;
  }
  next();
};

module.exports = { uploadFileHandler };
