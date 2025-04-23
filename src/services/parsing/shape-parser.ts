// src/services/parsing/shape-parser.ts
import { ShapeFactoryRegistry } from './shape-factory-registry';
import { Shape } from '../../entities/base/shape';
import { UnknownShapeTypeError } from '../../core/errors';
import { extractShapeMetadata } from './shape-metadata';

export class ShapeParser {
  constructor(private readonly registry: ShapeFactoryRegistry) {}

  parse(line: string): Shape {
    const { type, data } = extractShapeMetadata(line);
    const factory = this.registry.getFactory(type);

    if (!factory) {
      throw new UnknownShapeTypeError(type);
    }

    const shape = factory.create(data);
    if (!shape) {
      throw new UnknownShapeTypeError(`Factory returned null for type: ${type}`);
    }

    return shape;
  }
}
