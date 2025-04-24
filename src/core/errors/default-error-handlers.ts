// src/core/errors/default-error-handlers.ts
import { InvalidShapeDataError, UnknownShapeTypeError, InvalidPointFormatError } from './errors';
import { ErrorContext } from '@src/interfaces/error-context';
import { Logger } from '../logger';

export const defaultErrorHandlers: Array<
  [new (...args: any[]) => Error, (error: Error, context: ErrorContext) => void]
> = [
  [
    InvalidShapeDataError,
    (error, context) => {
      Logger.warn({ ...context, message: error.message }, 'Invalid shape data');
    },
  ],
  [
    UnknownShapeTypeError,
    (error, context) => {
      Logger.warn({ ...context, message: error.message }, 'Unknown shape type');
    },
  ],
  [
    InvalidPointFormatError,
    (error, context) => {
      Logger.warn({ ...context, message: error.message }, 'Invalid point format');
    },
  ],
];
