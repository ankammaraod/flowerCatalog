const fs = require("fs");


const redirectionToDisplayComments = (request, response) => {
  response.statusCode = 302;
  response.setHeader('Location', '/print');
  response.end('');
};

const getParams = (request, response) => {
  const params = {};
  for (const param of request.url.searchParams.entries()) {
    const [key, value] = param;
    params[key] = value;
  }
  return params;
};

const handleComment = (request, response) => {

  const { name, comment } = getParams(request, response);
  const { guestBook } = request;

  if (!name) {
    redirectionToDisplayComments(request, response);
    return;
  }

  const date = new Date().toLocaleString();

  guestBook.unshift({ date, name, comment });

  fs.writeFileSync('./public/comments.json', JSON.stringify(guestBook), 'utf-8');

  redirectionToDisplayComments(request, response);
  return;
};

const formatItem = (comment) => {
  return `<li>${comment.date} | ${comment.name} | ${comment.comment}</li>`
};

const formatComments = (comments) => {
  let htmlComments = '';
  comments.forEach(comment => {
    htmlComments += formatItem(comment);
  });
  return `<ul>${htmlComments}</ul>`
};

const handleDisplayComments = (request, response) => {

  const { guestBook } = request;
  const html = fs.readFileSync('./public/guestBook.html', 'utf-8');
  const formattedComments = formatComments(guestBook);
  const pageContent = html.replaceAll('--comments--', formattedComments);
  response.setHeader('content-type', 'text/html');
  response.end(pageContent);
};

const handleGuestBook = (guestBook) => {
  return (request, response) => {
    const { pathname } = request.url

    if (pathname === '/comment' && request.method === 'GET') {
      request.guestBook = guestBook;
      handleComment(request, response);
      return true;
    }

    if (pathname === '/print' && request.method === 'GET') {
      request.guestBook = guestBook;
      handleDisplayComments(request, response);
      return true;
    }
    return false;
  }
};

module.exports = { handleGuestBook };
