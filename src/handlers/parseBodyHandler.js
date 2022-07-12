const CRLF = '\r\n';

const getBoundary = (request) => {
  return request.headers['content-type'].split(';')[1].split('=')[1];
};

const findBoundaryPoints = (bufferData, bufferBoundary) => {
  const boundaryStartPoints = [];
  let currentIndex = 0;

  do {
    boundaryStartPoints.push(currentIndex);
    currentIndex = bufferData.indexOf(bufferBoundary, bufferBoundary.length + currentIndex);
  } while (currentIndex >= 0);
  return boundaryStartPoints;
};

const extractFields = (bufferData, boundaryStartPoints, bufferBoundary) => {
  let index = 0;
  let j = 0;
  const fields = [];
  const boundaryLength = bufferBoundary.length;
  while (index < bufferData.length) {

    const content = bufferData.slice(boundaryStartPoints[j] +
      boundaryLength, boundaryStartPoints[j + 1]);
    fields.push(content);
    index = boundaryStartPoints[j + 1];
    j++;
  }
  return fields;
};

const parseHeaders = (headers) => {
  const parsedHeaders = {};
  const headersString = headers.toString().split('\r\n').filter(x => x)[0];
  const splitHeaders = headersString.split(';');
  splitHeaders.forEach(header => {

    const separator = header.includes('=') ? '=' : ':';
    const [name, value] = header.split(separator);
    parsedHeaders[name] = value;

  })
  return parsedHeaders
};

const parseContent = (parsedHeaders, content) => {

  if (parsedHeaders['filename']) {
    return content.toString().split(CRLF).filter(x => x)[0].trim();
  }
  return content;
};

const parseField = (field) => {
  const crlfBuffer = Buffer.from(CRLF + CRLF);
  const indexOfCrlf = field.indexOf(crlfBuffer);
  const headers = field.slice(0, indexOfCrlf);
  const content = field.slice(indexOfCrlf + crlfBuffer.length);

  const parsedHeaders = parseHeaders(headers);
  const parsedContent = parseContent(parsedHeaders, content);
  return { headers: parsedHeaders, content: parsedContent };
};

const parseBody = (request, data) => {
  const bufferData = Buffer.concat(data)
  const boundaryValue = getBoundary(request);

  const bufferBoundary = Buffer.from('--' + boundaryValue);
  const boundaryStartPoints = findBoundaryPoints(bufferData, bufferBoundary);

  const fields = extractFields(bufferData, boundaryStartPoints, bufferBoundary);

  return fields.map(field => parseField(field)).slice(0, -1);
};

const readBody = (request, response, next) => {
  if (request.method !== 'POST') {
    next();
    return;
  }

  const contentType = request.headers['content-type'];

  if (!contentType.startsWith('multipart/form-data')) {
    next();
    return;
  }

  let data = [];
  request.on('data', chunk => data.push(chunk));
  request.on('end', () => {
    request.body = parseBody(request, data);
    next();
  });

};

module.exports = { readBody };