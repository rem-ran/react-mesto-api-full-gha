require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_ADDRESS, PORT } = require('./config');

const app = express();

app.use(cors({ origin: ['https://remran.nomoredomains.work'], credentials: true, maxAge: 300 }));

app.use(cookieParser());

app.use(express.json());

// подклчюение к базе mongoDB
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

// подключаем логгер запросов
app.use(requestLogger);

// подключаем руты
app.use(routes);

// подключаем логгер ошибок
app.use(errorLogger);

// подключаем централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT);
