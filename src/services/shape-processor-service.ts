// src/services/shape-processor-service.ts
import { Shape } from '../entities/base/shape';
import { ShapeHandler } from '../interfaces/shape-handler.interface';

/**
 * Dispatches Shape instances to the correct handler based on shape type.
 */
export class ShapeProcessorService {
  constructor(private readonly handlers: ShapeHandler[]) {}

  /**
   * Finds the first handler that supports the given shape and delegates processing.
   * If no handler is found, returns a warning.
   * @param shape Parsed shape object
   * @returns Processed result or warning
   */
  process(shape: Shape): Record<string, unknown> {
    const handler = this.handlers.find((h) => h.canHandle(shape));

    if (!handler) {
      return {
        type: shape.name,
        id: shape.id,
        warning: 'Unsupported shape type',
      };
    }

    return handler.process(shape);
  }
}
