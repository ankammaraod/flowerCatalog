const EOL = '\r\n';
const statusMessages = {
  200: 'ok',
  404: 'not found'
};

class Response {
  #socket;
  #statusCode;
  #headers;
  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  #responseLine() {
    const version = 'HTTP/1.1'
    const message = statusMessages[this.#statusCode];
    return `${version} ${this.#statusCode} ${message}${EOL}`;
  }

  setHeader(field, value) {
    this.#headers[field] = value;
  }

  write(content) {
    this.#socket.write(content);
  }

  end() {
    this.#socket.end();
  }

  writeHeaders() {
    Object.entries(this.#headers).forEach(([field, value]) => {
      this.write(`${field}: ${value}${EOL}`);
    });
  }

  send(content) {
    this.setHeader('content-length', content.length);

    this.write(this.#responseLine());
    this.writeHeaders();
    this.write(EOL);
    this.write(content);
    this.end();
  }

  set statusCode(number) {
    this.#statusCode = number;
  }
}

module.exports = { Response };
