const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const kanjiRoute = require('./routes/kanjiRoute')

const app = express();
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

// ROUTES
app.use('/api/v1/kanji_quest', kanjiRoute);


module.exports = app;