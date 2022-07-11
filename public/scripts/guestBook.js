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

const parseFormDetails = (formData) => {
  const parsedFormDetails = [];
  for (const [name, value] of formData) {
    const paramString = name + '=' + value;
    parsedFormDetails.push(paramString);
  }
  return parsedFormDetails;
};

const xhrPost = (callBack, path, data) => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => callBack(xhr));
  xhr.open('POST', path);
  xhr.send(data);
};

const XhrGet = (callBack, path, data = '') => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => callBack(xhr));
  xhr.open('GET', path);
  xhr.send();
};


const requestGuestBook = (url) => {
  const guestBook = (xhr) => {
    displayGuestBook(xhr);
  }

  XhrGet(guestBook, url);
};


const addComment = () => {
  const formElement = document.querySelector('form');
  const formData = new FormData(formElement);
  const body = parseFormDetails(formData).join('&');

  const commentsBook = (xhr) => {
    if (xhr.status) {
      requestGuestBook('/api/guest-book');
    }
  };

  xhrPost(commentsBook, '/add-comment', body);
};

const main = () => {
  const button = document.querySelector('#submit');
  button.addEventListener('click', addComment);
};

window.onload = main;

//use the status code of response instead of sending true and false