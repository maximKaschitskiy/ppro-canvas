const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const ALLOWED_CORS = [
  'http://localhost:5500',
  'https://localhost:5500',
  'http://127.0.0.1:5500',
  'https://127.0.0.1:5500',
  'http://localhost:5506',
  'https://localhost:5506',
  'http://127.0.0.1:5506',
  'https://127.0.0.1:5506',
  'file://'
];

const corsMiddleware = (req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const { origin } = req.headers;

  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
};

module.exports = {
    corsMiddleware,
  }