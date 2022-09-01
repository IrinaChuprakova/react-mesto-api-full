// const origins = [

// module.exports = (req, res, next) => {
//   res.header('Access-Control-Allow-Headers', origins);
//   next();
// };

const corsOptions = {
  origin: [
    'http://mestoirina.nomoredomains.sbs/',
    'http://localhost:3000',
  ],
  credentials: true,
};
module.exports = { corsOptions};
