const handleGuestBookApi = (request, response) => {
  const { guestBook } = request;
  response.setHeader('content-type', 'application/json');
  response.send(JSON.stringify(guestBook));
};

const handleApiRouter = (guestBook) => {
  return (request, response, next) => {
    request.guestBook = guestBook;
    handleGuestBookApi(request, response);
    return;
  }
};

module.exports = { handleApiRouter }