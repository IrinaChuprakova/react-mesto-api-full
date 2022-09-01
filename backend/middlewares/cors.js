const origins = [
  'http://mestoirina.nomoredomains.sbs/',
  'http://localhost:3000'];

module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Headers', origins);
  next();
};
