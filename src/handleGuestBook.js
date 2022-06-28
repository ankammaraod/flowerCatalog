const fs = require("fs");

const redirectionToDisplayComments = (request, response) => {
  response.statusCode = 302;
  response.setHeader('Location', '/print');
  response.send('');
};

const handleComment = (request, response) => {
  const { name, comment } = request.queryParams;
  if (!name) {
    redirectionToDisplayComments(request, response);
    return;
  }

  const date = new Date();
  const comments = JSON.parse(fs.readFileSync('./public/comments.json', 'utf-8'));

  comments.unshift({ date, name, comment });

  fs.writeFileSync('./public/comments.json', JSON.stringify(comments), 'utf-8');
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
  const comments = JSON.parse(fs.readFileSync('./public/comments.json', 'utf8'));
  const html = fs.readFileSync('./public/guestBook.html', 'utf-8');
  const formattedComments = formatComments(comments);
  const pageContent = html.replaceAll('--comments--', formattedComments);
  response.setHeader('content-type', 'text/html');
  response.send(pageContent);
};

const handleGuestBook = (request, response) => {
  const { uri } = request;

  if (uri === '/comment') {
    handleComment(request, response);
    return true;
  }
  if (uri === '/print') {
    handleDisplayComments(request, response);
  }
  return false;
};

module.exports = { handleGuestBook };
