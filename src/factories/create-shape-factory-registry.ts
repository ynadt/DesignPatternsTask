// src/factories/create-shape-factory-registry.ts
import { rectangleValidator } from '../services/validation/rectangle/rectangle-validator';
import { pyramidValidator } from '../services/validation/pyramid/pyramid-validator';
import { RectangleFactory } from './rectangle-factory';
import { PyramidFactory } from './pyramid-factory';
import { ShapeFactoryRegistry } from './shape-factory-registry';

export function createFactoryRegistry(): ShapeFactoryRegistry {
  const registry = new ShapeFactoryRegistry();

  registry.register('RECTANGLE', new RectangleFactory(rectangleValidator));
  registry.register('PYRAMID', new PyramidFactory(pyramidValidator));

  return registry;
}
