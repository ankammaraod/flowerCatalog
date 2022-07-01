const CreateRouter = (handlers) => {
  return (request, response) => {
    for (const handler of handlers) {
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  }
};

const createNext = (handlers) => {
  let index = -1;
  const next = (request, response) => {
    index++;
    const currentHandler = handlers[index];
    if (currentHandler) {
      currentHandler(request, response, () => next(request, response));
    }
  }
  return next;
}

const createRouter = (handlers) => {
  return (request, response) => {
    const next = createNext(handlers);
    next(request, response);
  }
};

module.exports = { createRouter };
