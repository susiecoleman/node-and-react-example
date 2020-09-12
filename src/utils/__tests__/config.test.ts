import { getEnvVariable, getEnvVariables } from '../config';

describe('getEnvVariable', () => {
  test('should return a string when the env variable exists', () => {
    expect(getEnvVariable('PORT')).not.toBeUndefined();
  });

  test('should throw an exception when the env variable does not exist', () => {
    expect(() => getEnvVariable('DOES_NOT_EXIST')).toThrow();
  });
});

describe('getEnvVariables', () => {
  test('should return an object when the env variable exists', () => {
    const result = getEnvVariables('PORT');
    expect(result).not.toBeUndefined();
    expect(result).toEqual({ PORT: '5000' });
  });

  test('should return an object with multiple values when given multiple inputs provided the env variables exist', () => {
    const result = getEnvVariables('PORT', 'LOG_LEVEL');
    expect(result).not.toBeUndefined();
    expect(result).toEqual({ PORT: '5000', LOG_LEVEL: 'info' });
  });

  test('should throw an exception when the env variable does not exist', () => {
    expect(() => getEnvVariables('DOES_NOT_EXIST')).toThrow();
  });

  test('should throw an exception if any env variable does not exist in the params list', () => {
    expect(() => getEnvVariables('DOES_NOT_EXIST', 'PORT')).toThrow();
  });
});
