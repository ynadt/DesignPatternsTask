import { defaultErrorHandlers } from '@src/core/errors/default-error-handlers';
import {
  InvalidShapeDataError,
  UnknownShapeTypeError,
  InvalidPointFormatError,
} from '@src/core/errors/errors';
import { Logger } from '@src/core/logger';
import { ErrorContext } from '@src/interfaces/error-context';

jest.mock('@src/core/logger', () => ({
  Logger: {
    warn: jest.fn(),
  },
}));

describe('defaultErrorHandlers', () => {
  const context: ErrorContext = { line: 'SHAPE 1,2,3' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('logs InvalidShapeDataError with correct message', () => {
    const [_, handler] = defaultErrorHandlers.find(([err]) => err === InvalidShapeDataError)!;
    const error = new InvalidShapeDataError('Shape is broken');

    handler(error, context);

    expect(Logger.warn).toHaveBeenCalledWith(
      { ...context, message: 'Shape is broken' },
      'Invalid shape data',
    );
  });

  test('logs UnknownShapeTypeError with correct message', () => {
    const [_, handler] = defaultErrorHandlers.find(([err]) => err === UnknownShapeTypeError)!;
    const error = new UnknownShapeTypeError('Triangle');

    handler(error, context);

    expect(Logger.warn).toHaveBeenCalledWith(
      { ...context, message: 'Unknown shape type: Triangle' },
      'Unknown shape type',
    );
  });

  test('logs InvalidPointFormatError with correct message', () => {
    const [_, handler] = defaultErrorHandlers.find(([err]) => err === InvalidPointFormatError)!;
    const error = new InvalidPointFormatError('Invalid point');

    handler(error, context);

    expect(Logger.warn).toHaveBeenCalledWith(
      { ...context, message: 'Invalid point' },
      'Invalid point format',
    );
  });
});
