const handleGuestBookApi = (request, response) => {
  const { guestBook } = request;
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(guestBook));
};

const handleApiRouter = (guestBook) => {
  return (request, response) => {
    const { pathname } = request.url
    if (pathname === '/api/guest-book') {
      request.guestBook = guestBook;
      handleGuestBookApi(request, response);
      return true;
    }
    return false;
  }
};

module.exports = { handleApiRouter }