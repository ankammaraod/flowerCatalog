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

const displayGuestBook = (xhr) => {
  const comments = JSON.parse(xhr.response);
  const htmlComments = formatComments(comments);
  const commentElement = document.querySelector('#comments');
  const ulElement = commentElement.firstChild;

  commentElement.removeChild(ulElement);
  commentElement.innerHTML = htmlComments;

  const formElement = document.querySelector('form');
  formElement.reset();
};

const performXhr = (method, callBack, path, data = '') => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => callBack(xhr));
  xhr.open(method, path);
  xhr.send(data);
};


const requestGuestBook = (url) => {
  const guestBook = (xhr) => {
    displayGuestBook(xhr);
  }
  performXhr('GET', guestBook, url);
};


const addComment = () => {
  const formElement = document.querySelector('form');
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData);

  const commentsBook = (xhr) => {
    if (xhr.status === 201) {
      requestGuestBook('/api/guest-book');
    }
  };

  performXhr('POST', commentsBook, '/add-comment', body);
};

const main = () => {
  const button = document.querySelector('#submit');
  button.addEventListener('click', addComment);
};

window.onload = main;
