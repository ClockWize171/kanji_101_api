const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const AppError = require('./utils/appError')
const kanjiRoute = require('./routes/kanjiRoute');

const app = express();
app.use(helmet());


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit request
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// ROUTES
app.use('/api/v1/kanji_quest', kanjiRoute);

app.all('*', (req, res, next) => {
    next(
        res.status(500).json({
            status: "fail",
            message: `Can't find ${req.originalUrl} on this server!`
        })
    )
});

module.exports = app;