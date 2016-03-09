const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;

export default (req) => {
  const {notFound} = req.clientContext.router;

  if (notFound) {
    return HTTP_NOT_FOUND;
  }

  return HTTP_OK;
};
