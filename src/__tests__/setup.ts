import { logger } from '../utils/logger';

const TEST_PROCESS_ENV = {
  LOG_LEVEL: 'info',
  PORT: 5000,
};

// Set environment variables for test
process.env = Object.assign(process.env, TEST_PROCESS_ENV);

// Mute logger during test suite
logger.transports.forEach(t => (t.silent = true));
