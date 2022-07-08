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
}

const requestGuestBook = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', (event) => displayGuestBook(xhr));
  xhr.open('GET', url)
  xhr.send();
}

const parseFormDetails = (formData) => {
  const parsedFormDetails = [];
  for (const [name, value] of formData) {
    const paramString = name + '=' + value;
    parsedFormDetails.push(paramString);
  }
  return parsedFormDetails;
};

const addComment = () => {
  const formElement = document.querySelector('form');
  const formData = new FormData(formElement);

  const body = parseFormDetails(formData).join('&');
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', (event) => {
    if (xhr.status) {
      requestGuestBook('/api/guest-book');
    }
  });

  xhr.open('POST', '/add-comment');
  xhr.send(body);
};

const main = () => {
  const button = document.querySelector('#submit');
  button.addEventListener('click', addComment);
};

window.onload = main;

//use the status code of response instead of sending true and false