import { Logger } from '@src/core/logger';
import pino from 'pino';

jest.mock('pino', () => {
  return jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  }));
});

describe('Logger', () => {
  test('initializes pino with correct transport settings', () => {
    const mockedPino = pino as unknown as jest.Mock;

    jest.resetModules();
    require('@src/core/logger');

    expect(mockedPino).toHaveBeenCalledWith({
      transport: {
        targets: expect.arrayContaining([
          expect.objectContaining({
            target: 'pino-pretty',
            options: expect.objectContaining({
              colorize: true,
              translateTime: 'SYS:standard',
            }),
          }),
          expect.objectContaining({
            target: 'pino/file',
            options: expect.objectContaining({
              destination: expect.any(String),
              mkdir: true,
            }),
          }),
        ]),
      },
    });
  });

  test('provides standard log methods', () => {
    expect(typeof Logger.info).toBe('function');
    expect(typeof Logger.error).toBe('function');
    expect(typeof Logger.warn).toBe('function');
    expect(typeof Logger.debug).toBe('function');
  });
});
