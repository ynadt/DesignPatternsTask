import { ShapeFactoryRegistry } from '@src/factories/shape-factory-registry';

describe('ShapeFactoryRegistry', () => {
  test('register and retrieve factory (case-insensitive)', () => {
    const registry = new ShapeFactoryRegistry();
    const mockFactory = { create: jest.fn() };

    registry.register('Rectangle', mockFactory);

    expect(registry.getFactory('RECTANGLE')).toBe(mockFactory);
    expect(registry.getFactory('rectangle')).toBe(mockFactory);
  });

  test('returns undefined for unknown type', () => {
    const registry = new ShapeFactoryRegistry();
    expect(registry.getFactory('UNKNOWN')).toBeUndefined();
  });
});
