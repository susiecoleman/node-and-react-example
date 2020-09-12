import * as dotenv from 'dotenv';

import { logger } from './logger';

const result = dotenv.config();
if (result.error) {
  logger.error('Failed to load .env file');
  throw result.error;
}

const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (value !== undefined) {
    return value;
  }
  throw new Error(`No value exists for environment variable: ${key}`);
};

const getEnvVariables = (...keys: string[]): { [key: string]: string } => {
  const obj: { [key: string]: string } = {};
  keys.map(key => (obj[key] = getEnvVariable(key)));
  return obj;
};

export { getEnvVariable, getEnvVariables };
