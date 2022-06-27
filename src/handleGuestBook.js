class Comments {
  constructor() {
    this.comments = [];
  }

  addComment(date, name, comment) {

    this.comments.unshift({ date, name, comment: comment.replaceAll('+', ' ') });
  }

  formatComments() {
    let formattedComments = '';
    this.comments.forEach(comment => {
      formattedComments += `${comment.date}_${comment.name}_${comment.comment}\n`
    });
    return formattedComments;
  }
}


const handleComment = (request, response, comments) => {
  const { name, comment } = request.queryParams;
  const date = new Date();
  comments.addComment(date, name, comment);
  const allComments = comments.formatComments();
  response.send(allComments);
};

const handleGuestBook = (request, response, path, comments) => {
  console.log(comments);
  const { uri } = request;
  if (uri === '/comment') {
    handleComment(request, response, comments);
    return true;
  }
  return false;
};

module.exports = { handleGuestBook, Comments };