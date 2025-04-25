// src/services/parsing/shape-parser.ts
import { ShapeFactoryRegistry } from '@src/factories/shape-factory-registry';
import { Shape } from '@src/entities/base/shape';
import { UnknownShapeTypeError } from '@src/core/errors/errors';
import { extractShapeMetadata } from './shape-metadata';

/**
 * Parses a raw shape string into a Shape object using the corresponding factory.
 * Throws an error if the shape type is unknown or invalid.
 */
export class ShapeParser {
  constructor(private readonly registry: ShapeFactoryRegistry) {}

  /**
   * Converts a string like "RECTANGLE 0,0; 0,4; 4,4; 4,0" into a Shape instance.
   * @param line Raw input string
   * @returns Shape object
   */
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
