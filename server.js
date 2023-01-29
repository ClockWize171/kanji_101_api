const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.MONGO_URL.replace(
    '<PASSWORD>',
    process.env.MONGO_PASSWORD
);

mongoose
    // .connect(process.env.MONGO_LOCAL, {
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => console.log('DB connection established'));

// SERVER LAUNCH
const port = 8000;
const server = app.listen(port, () => {
    console.log(`App is running on ${port}...`)
});

