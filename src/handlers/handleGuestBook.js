const fs = require("fs");


const redirectionToDisplayComments = (request, response) => {
  response.statusCode = 302;
  response.setHeader('Location', '/guest-book');
  response.end('');
};

const formatComments = (comments) => {
  let htmlComments = '';
  comments.forEach(comment => {
    htmlComments += formatItem(comment);
  });
  return `<ul>${htmlComments}</ul>`
};

const formatItem = (comment) => {
  return `<li>${comment.date} | ${comment.name} | ${comment.comment}</li>`
};

const handleDisplayComments = (request, response) => {

  const { guestBook, templatePath } = request;

  const html = fs.readFileSync(templatePath, 'utf-8');

  const formattedComments = formatComments(guestBook);

  const pageContent = html.replaceAll('--comments--', formattedComments);

  response.setHeader('content-type', 'text/html');
  response.end(pageContent);
  return true;
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
  const { guestBook, commentsPath } = request;

  const date = new Date().toLocaleString();
  guestBook.unshift({ date, name, comment });

  fs.writeFileSync(commentsPath, JSON.stringify(guestBook), 'utf-8');

  redirectionToDisplayComments(request, response);
  return true;
};

const handleGuestBook = (guestBook, commentsPath, templatePath) => {
  return (request, response) => {
    const { pathname } = request.url

    if (pathname === '/guest-book' && request.method === 'GET') {
      request.guestBook = guestBook;
      request.templatePath = templatePath;
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

//read function and write function
//pass the template path and comments path from the closure 