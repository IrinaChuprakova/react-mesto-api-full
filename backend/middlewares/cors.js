const origins = 'http://mestoirina.nomoredomains.sbs/';

module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Headers', origins);
  next();
};
