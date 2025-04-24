// src/core/errors/error-handler.ts
import { Logger } from '../logger';
import { ErrorContext } from '@src/interfaces/error-context';

export class ErrorHandler {
  constructor(public readonly logger: typeof Logger) {}

  private readonly handlers = new Map<
    new (...args: any[]) => Error,
    (error: Error, context: ErrorContext) => void
  >();

  register<T extends Error>(
    type: new (...args: any[]) => T,
    handler: (error: T, context: ErrorContext) => void,
  ): void {
    this.handlers.set(type, handler as (error: Error, context: ErrorContext) => void);
  }

  registerMany(
    registrations: Array<
      [new (...args: any[]) => Error, (error: Error, context: ErrorContext) => void]
    >,
  ): void {
    for (const [type, handler] of registrations) {
      this.register(type, handler);
    }
  }

  handle(error: unknown, context: ErrorContext = {}): void {
    for (const [type, handler] of this.handlers) {
      if (error instanceof type) {
        handler(error, context);
        return;
      }
    }

    this.logger.error({ err: error, ...context }, 'Unexpected error');
  }
}
