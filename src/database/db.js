import mongoose from 'mongoose';
import config from '../config/config';
import logger from '../config/logger';

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info('MongoDB is connected');
  })
  .catch((err) => {
    logger.error(err);
  });
