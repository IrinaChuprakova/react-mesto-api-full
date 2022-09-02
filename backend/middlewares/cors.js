const allowedCors = [
  'http://mestoirina.nomoredomains.sbs/',
  'https://mestoirina.nomoredomains.sbs/',
  'http://mestoirina.nomoredomains.sbs/api',
  'https://mestoirina.nomoredomains.sbs/api',
  'localhost:3000',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
    return;
  }

  next();
};

module.exports = cors;
