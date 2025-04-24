import { createFactoryRegistry } from '@src/factories/create-shape-factory-registry';
import { ShapeFactoryRegistry } from '@src/factories/shape-factory-registry';

describe('createFactoryRegistry', () => {
  test('registers factories for known types', () => {
    const registry: ShapeFactoryRegistry = createFactoryRegistry();

    expect(registry.getFactory('RECTANGLE')).toBeDefined();
    expect(registry.getFactory('PYRAMID')).toBeDefined();
  });

  test('returns undefined for unknown shape type', () => {
    const registry = createFactoryRegistry();
    expect(registry.getFactory('TRIANGLE')).toBeUndefined();
  });
});
