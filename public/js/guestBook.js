const sayHai = () => {
  console.log('hai');
}


const parseFormDetails = (formData) => {
  const parsedFormDetails = [];
  for (const [name, value] of formData) {
    const paramString = name + '=' + value;
    parsedFormDetails.push(paramString);
  }
  return parsedFormDetails;
};

const sendAddComment = () => {

  const formElement = document.querySelector('form');
  const formData = new FormData(formElement);

  const body = parseFormDetails(formData).join('&');

  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', sayHai);
  xhr.open('POST', '/add-comment');
  xhr.send(body);
  window.location.reload();
};

const main = () => {
  const button = document.querySelector('#submit');
  button.addEventListener('click', sendAddComment);
};

window.onload = main;