import config from '../config/config';
import logger from '../config/logger';
import APIError from '../utils/APIError';
import { errorResponse } from '../utils/response';

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof APIError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error!';
    error = new APIError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = 500;
    message = 'Internal server error!';
  }

  res.locals.errorMessage = err.message;

  //   const response = {
  //     code: statusCode,
  //     message,
  //     ...(config.env === 'development' && { stack: err.stack }),
  //   };

  if (config.env === 'development') {
    logger.error(err);
  }

  logger.error(err);

  errorResponse(res, statusCode, message);
};

export { errorConverter, errorHandler };
