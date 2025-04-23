// src/config/factories/shape-factories.ts
import { rectangleValidator } from '../../services/validation/rectangle/rectangle-validator';
import { pyramidValidator } from '../../services/validation/pyramid/pyramid-validator';
import { RectangleFactory } from '../../factories/rectangle-factory';
import { PyramidFactory } from '../../factories/pyramid-factory';
import { ShapeFactoryRegistry } from '../../services/parsing/shape-factory-registry';

export function createFactoryRegistry(): ShapeFactoryRegistry {
  const registry = new ShapeFactoryRegistry();

  registry.register('RECTANGLE', new RectangleFactory(rectangleValidator));
  registry.register('PYRAMID', new PyramidFactory(pyramidValidator));

  return registry;
}
