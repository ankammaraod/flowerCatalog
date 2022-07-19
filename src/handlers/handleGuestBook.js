const fs = require("fs");

const redirectionToGuestBook = (request, response) => {
  response.status(302);
  response.redirect('/guest-book');
  response.end();
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

const writeData = (path, content) => {
  fs.writeFileSync(path, JSON.stringify(content, 'utf-8'));
};

const handleDisplayComments = (request, response) => {
  let username = '';
  if (request.session) {
    username = request.session.username;
  }

  const { guestBook, template } = request;

  const formattedComments = formatComments(guestBook);

  const pageContent = template.replaceAll('--comments--', formattedComments);
  const content = pageContent.replaceAll('--name--', username);
  response.setHeader('content-type', 'text/html');
  response.end(content);

};

const handleComment = (request, response) => {

  const { name, comment } = request.bodyParams;
  if (name && comment) {
    const { guestBook, commentsPath } = request;

    const date = new Date().toLocaleString();
    guestBook.unshift({ date, name, comment });

    writeData(commentsPath, guestBook);
    response.status(201).end();

    return;
  }
  response.end();

};

const guestBookRouter = (guestBook, template, commentsPath) => {
  return (request, response, next) => {
    const pathname = request.url

    if (pathname === '/guest-book' && request.method === 'GET') {
      request.guestBook = guestBook;
      request.template = template;
      return handleDisplayComments(request, response);
    }

    if (pathname === '/add-comment' && request.method === 'POST') {
      request.guestBook = guestBook;
      request.commentsPath = commentsPath;
      return handleComment(request, response);
    }
    next();
  }
};

const serveGuestBook = (guestBook, template) => {
  return (request, response, next) => {
    console.log('--------', request.session);
    request.session.index++;
    request.guestBook = guestBook;
    request.template = template;
    return handleDisplayComments(request, response);
  }
};

const handleAddComment = (guestBook, guestBookPath) => {
  return (request, response, next) => {
    request.guestBook = guestBook;
    request.commentsPath = guestBookPath;
    return handleComment(request, response);
  }
}

module.exports = { serveGuestBook, handleAddComment };