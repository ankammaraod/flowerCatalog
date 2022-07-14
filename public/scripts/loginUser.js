const performXhr = (method, callBack, path, data = '') => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => callBack(xhr));
  xhr.open(method, path);
  xhr.send(data);
};

const loginUser = () => {
  const formElement = document.querySelector('form');
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData);

  const messageElement = document.querySelector('#message');

  const displayMessage = (xhr) => {
    if (xhr.status === 401) {
      messageElement.innerHTML = "invalid user..."
      formElement.reset();
    }
    if (xhr.status === 200) {
      window.location = 'http://localhost:9090/flowerCatlog.html'
    }
  }

  performXhr('POST', displayMessage, '/login', body);
};

const main = () => {
  const button = document.querySelector('#submit');
  button.addEventListener('click', loginUser);
};

window.onload = main;