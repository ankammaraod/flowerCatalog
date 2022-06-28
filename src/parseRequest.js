const makeLines = (chunk) => {
  return chunk.toString().split('\r\n');
};

const parseUri = (rawUri) => {
  const queryParams = {};
  const [uri, queryString] = rawUri.split('?');
  if (queryString) {
    queryString.split('&').forEach(paramString => {
      const [param, value] = paramString.split('=');
      const parsedValue = value.replaceAll('+', ' ').replaceAll('%0D%0A', '\r\n')
      queryParams[param] = parsedValue;
    });
  }
  return { uri, queryParams };
};

const parseRequest = (line) => {
  const [method, rawUri, httpVersion] = line.split(' ');
  return { method, ...parseUri(rawUri), httpVersion };
};

const parseHeaders = (lines) => {

  const headers = {};
  let index = 0;
  while (index < lines.length && lines[index].length > 0) {
    const header = lines[index];
    const separatorIndex = header.indexOf(':');
    const field = header.slice(0, separatorIndex);
    const value = header.slice(separatorIndex + 1);
    headers[field] = value;
    index++;
  }

  return headers;
};

const parseChunk = (chunk) => {
  const lines = makeLines(chunk);
  const requestLine = parseRequest(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return { requestLine, headers };
}

module.exports = { parseChunk };