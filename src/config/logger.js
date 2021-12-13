import {
  format as _format,
  createLogger,
  transports as _transports,
} from 'winston';
import config from './config';

const {
  combine,
  colorize,
  uncolorize,
  splat,
  printf,
  timestamp,
} = _format;

const enumerateErrorFormat = _format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const customFormat = printf(
  ({ level, message }) => `${level}: ${message}`,
);

const logger = createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: combine(
    enumerateErrorFormat(),
    config.env === 'development' ? colorize() : uncolorize(),
    splat(),
    timestamp(),
    customFormat,
  ),
  transports: [
    new _transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;
