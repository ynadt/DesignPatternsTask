// src/services/shape-processor.ts
import { Shape } from '../entities/base/shape';
import { ShapeHandler } from '../interfaces/shape-handler.interface';

export class ShapeProcessorService {
  constructor(private readonly handlers: ShapeHandler[]) {}

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
