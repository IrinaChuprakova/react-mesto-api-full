const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const corsOptions = require('./middlewares/cors');
const error = require('./middlewares/erros');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(cors(corsOptions));
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

app.use('/api/users', auth, cors, require('./routes/users'));
app.use('/api/cards', auth, cors, require('./routes/cards'));

app.use('/*', auth, () => { throw new NotFoundError('Произошла ошибка'); });

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT);
