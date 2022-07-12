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
  return headers.toString().split('\r\n').filter(x => x);
};

const parseField = (field) => {
  const crlfBuffer = Buffer.from(CRLF + CRLF);
  const indexOfCrlf = field.indexOf(crlfBuffer);
  const headers = field.slice(0, indexOfCrlf);
  const content = field.slice(indexOfCrlf + crlfBuffer.length)

  const parsedHeaders = parseHeaders(headers)
  return { headers: parsedHeaders, content };
};


const parseBody = (request) => {
  const bodyParams = [];
  const bufferData = Buffer.concat(request.body)
  const boundaryValue = getBoundary(request);

  const bufferBoundary = Buffer.from('--' + boundaryValue);
  const boundaryStartPoints = findBoundaryPoints(bufferData, bufferBoundary);

  const fields = extractFields(bufferData, boundaryStartPoints, bufferBoundary);


  fields.forEach(field => {
    bodyParams.push(parseField(field));
  });
  return bodyParams.slice(0, -1);
};


//------------------------------------------------------------------------------

const uploadFileHandler = (request, response, next) => {
  const { pathname } = request.url;
  const { method } = request;

  if (pathname === '/upload-file' && method === 'GET') {
    response.statusCode = 302;
    response.setHeader('location', '/fileUpload.html')
    response.end();
    return;
  }

  if (pathname === '/upload-file' && method === 'POST') {
    const parsedContent = parseBody(request);
    response.end(JSON.stringify(parsedContent));
    return;
  }
  next();
};

module.exports = { uploadFileHandler };
