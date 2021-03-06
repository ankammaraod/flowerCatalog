const performXhr = (method, callBack, path, data = '') => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => callBack(xhr));
  xhr.open(method, path);
  xhr.send(data);
};

const registerUser = () => {
  const formElement = document.querySelector('form');
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData);

  const messageElement = document.querySelector('#message');

  const displayMessage = (xhr) => {
    if (xhr.status === 201) {
      messageElement.innerHTML = "Registered successful..."

    }
    if (xhr.status === 403) {
      messageElement.innerHTML = "User already exist..."
    }
    formElement.reset();
  }

  performXhr('POST', displayMessage, '/register', body);
};

const main = () => {
  const button = document.querySelector('#submit');
  button.addEventListener('click', registerUser);
};

window.onload = main;