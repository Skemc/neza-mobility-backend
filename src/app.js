import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
// eslint-disable-next-line no-unused-vars
import db from './database/db';
import config from './config/config';
import morgan from './config/morgan';
import path from 'path';
import APIError from './utils/APIError';
import { errorConverter, errorHandler } from './middlewares/error';
import routes from './routes';

const app = express();

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// app.use(xss());
// app.use(mongoSanitize());

// gzip compression
app.use(compression());

app.use(cors());
app.options('*', cors());
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/welcome.html'));
});


app.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/privacy.html'));
});


// Routes
app.use('/api', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new APIError(404, 'No route found'));
});

// convert error to APIError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;