// const uploadFileHandler = (request, response, next) => {
//   const { method } = request;

//   if (method === 'GET') {
//     response.status(302);
//     response.redirect('/fileUpload.html');
//     response.end();
//     return;
//   }

//   if (method === 'POST') {
//     console.log(request.body);
//     response.send('files Uploaded');
//     return;
//   }
// };


const serveUploadFile = (request, response, next) => {
  response.status(302);
  response.redirect('/fileUpload.html');
  response.end();
  return;
};

const uploadFileHandler = (request, response, next) => {
  console.log(request.body);
  response.send('files Uploaded');
  return;
};

module.exports = { uploadFileHandler, serveUploadFile };
