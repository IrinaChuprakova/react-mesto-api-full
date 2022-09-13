const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const error = require('./middlewares/erros');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://MestoIrina.nomoredomains.sbs',
    'https://MestoIrina.nomoredomains.sbs',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Set-Cookie'],
  credentials: true,
};

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors(options));

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);

app.post('/api/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/(?:www\.)?([\w-]+\.)+\/?\S*$/),
  }),
}), createUser);

app.post('/api/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use('/api/users', auth, require('./routes/users'));
app.use('/api/cards', auth, require('./routes/cards'));

app.use('/api/*', auth, () => { throw new NotFoundError('Произошла ошибка'); });

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT);
