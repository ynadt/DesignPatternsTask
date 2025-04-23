// src/core/error-handler.ts
import { Logger } from './logger';
import { InvalidPointFormatError, InvalidShapeDataError, UnknownShapeTypeError } from './errors';

type ErrorContext = {
  line?: string;
  file?: string;
  [key: string]: unknown;
};

export class ErrorHandler {
  constructor(public readonly logger: typeof Logger) {}

  private readonly handlers = new Map<Function, (error: Error, context: ErrorContext) => void>([
    [
      InvalidShapeDataError,
      (error, context) => {
        this.logger.warn({ ...context, message: error.message }, 'Invalid shape data');
      },
    ],
    [
      UnknownShapeTypeError,
      (error, context) => {
        this.logger.warn({ ...context, message: error.message }, 'Unknown shape type');
      },
    ],
    [
      InvalidPointFormatError,
      (error, ctx) => this.logger.warn({ ...ctx, message: error.message }, 'Ошибка формата точки'),
    ],
  ]);

  handle(error: unknown, context: ErrorContext = {}): void {
    for (const [type, handler] of this.handlers) {
      if (error instanceof type) {
        handler(error as Error, context);
        return;
      }
    }

    this.logger.error({ err: error, ...context }, 'Unexpected error');
  }
}
