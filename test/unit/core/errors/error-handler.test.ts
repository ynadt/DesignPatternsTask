import { ErrorHandler } from '@src/core/errors/error-handler';
import { ErrorContext } from '@src/interfaces/error-context';

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}

describe('ErrorHandler', () => {
  const logger = {
    error: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls handler for registered error type', () => {
    const error = new CustomError('Oops');
    const handler = jest.fn();
    const context: ErrorContext = { line: 'foo' };

    const errorHandler = new ErrorHandler(logger as any);
    errorHandler.register(CustomError, handler);

    errorHandler.handle(error, context);

    expect(handler).toHaveBeenCalledWith(error, context);
    expect(logger.error).not.toHaveBeenCalled();
  });

  test('logs error for unregistered error type', () => {
    const error = new Error('Unexpected');
    const context: ErrorContext = { file: 'main.ts' };

    const errorHandler = new ErrorHandler(logger as any);
    errorHandler.handle(error, context);

    expect(logger.error).toHaveBeenCalledWith({ err: error, ...context }, 'Unexpected error');
  });

  test('registerMany registers multiple handlers', () => {
    const error1 = new CustomError('Error 1');
    const error2 = new TypeError('Error 2');
    const h1 = jest.fn();
    const h2 = jest.fn();

    const errorHandler = new ErrorHandler(logger as any);
    errorHandler.registerMany([
      [CustomError, h1],
      [TypeError, h2],
    ]);

    errorHandler.handle(error1);
    errorHandler.handle(error2);

    expect(h1).toHaveBeenCalledWith(error1, {});
    expect(h2).toHaveBeenCalledWith(error2, {});
  });
});
