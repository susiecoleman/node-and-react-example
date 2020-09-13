import { createLogger, format, transports, Logger } from 'winston';
import { getEnvVariables } from '../utils/config';

const { combine, timestamp, colorize, simple, json, printf } = format;
const { Console, File } = transports;

const { LOG_LEVEL } = getEnvVariables('LOG_LEVEL');

const logFormat = printf(logInfo => {
  return `${logInfo.timestamp} [${logInfo.label}] ${logInfo.level}: ${logInfo.message}`;
});

const logger: Logger = createLogger({
  transports: [
    new File({
      filename: 'application.log',
      level: LOG_LEVEL,
      format: combine(timestamp(), logFormat, json()),
    }),
    new File({
      filename: 'error.log',
      level: 'error',
      format: combine(timestamp(), logFormat, json()),
    }),
    new Console({
      level: 'info',
      format: combine(colorize(), logFormat, simple()),
    }),
  ],
});

export { logger };
