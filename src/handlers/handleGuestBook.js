const fs = require("fs");


const redirectionToGuestBook = (request, response) => {
  response.statusCode = 302;
  response.setHeader('Location', '/guest-book');
  response.end('');
};

const html = (tag, content) => {
  return `<${tag}>${content}</${tag}>`
}

const formatItem = (comment) => {
  return html('li', `${comment.date} | ${comment.name} | ${comment.comment}`);
};

const formatComments = (comments) => {
  const htmlComments = comments.map(formatItem).join(' ');
  return html('ul', htmlComments);
};

const getParams = (request, response) => {
  const params = {};
  for (const param of request.url.searchParams.entries()) {
    const [key, value] = param;
    params[key] = value;
  }
  return params;
};

const writeData = (path, content) => {
  fs.writeFileSync(path, JSON.stringify(content, 'utf-8'));
};

const handleDisplayComments = (request, response) => {

  const { guestBook, template } = request;

  const formattedComments = formatComments(guestBook);

  const pageContent = template.replaceAll('--comments--', formattedComments);

  response.setHeader('content-type', 'text/html');
  response.end(pageContent);
  return true;
};


const handleComment = (request, response) => {

  const { name, comment } = getParams(request, response);
  const { guestBook, commentsPath } = request;

  const date = new Date().toLocaleString();
  guestBook.unshift({ date, name, comment });

  writeData(commentsPath, guestBook);

  redirectionToGuestBook(request, response);
  return true;
};

const handleGuestBook = (guestBook, template, commentsPath) => {
  return (request, response) => {
    const { pathname } = request.url

    if (pathname === '/guest-book' && request.method === 'GET') {
      request.guestBook = guestBook;
      request.template = template;
      return handleDisplayComments(request, response);
    }

    if (pathname === '/add-comment' && request.method === 'GET') {
      request.guestBook = guestBook;
      request.commentsPath = commentsPath;
      return handleComment(request, response);
    }

    return false;
  }
};

module.exports = { handleGuestBook };