import { createLogger, format, transports, Logger } from 'winston';
import { getEnvVariables } from '../utils/config';

const { combine, timestamp, colorize, simple, json } = format;
const { Console, File } = transports;

const { LOG_LEVEL } = getEnvVariables('LOG_LEVEL');

const logger: Logger = createLogger({
  transports: [
    new File({
      filename: 'application.log',
      level: LOG_LEVEL,
      format: combine(timestamp(), json()),
    }),
    new File({
      filename: 'error.log',
      level: 'error',
      format: combine(timestamp(), json()),
    }),
    new Console({
      level: 'info',
      format: combine(colorize(), simple()),
    }),
  ],
});

export { logger };
