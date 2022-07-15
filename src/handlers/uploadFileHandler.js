const uploadFileHandler = (request, response, next) => {
  const { method } = request;

  if (method === 'GET') {
    response.statusCode = 302;
    response.setHeader('location', '/fileUpload.html')
    response.send();
    return;
  }

  if (method === 'POST') {
    console.log(request.body);
    response.send('files Uploaded');
    return;
  }
  next();
};

module.exports = { uploadFileHandler };
