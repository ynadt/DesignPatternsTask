// src/services/handlers/base-shape-handler.ts
import { Shape } from '@src/entities/base/shape';
import { ShapeHandler } from '@src/interfaces/shape-handler.interface';

export abstract class BaseShapeHandler<T extends Shape> implements ShapeHandler {
  protected constructor(private readonly clazz: new (...args: any[]) => T) {}

  canHandle(shape: Shape): boolean {
    return shape instanceof this.clazz;
  }

  abstract processTyped(shape: T): Record<string, unknown>;

  process(shape: Shape): Record<string, unknown> {
    return this.processTyped(shape as T);
  }
}
