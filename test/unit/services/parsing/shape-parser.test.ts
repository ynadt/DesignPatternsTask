import { ShapeParser } from '@src/services/parsing/shape-parser';
import { ShapeFactoryRegistry } from '@src/factories/shape-factory-registry';
import { UnknownShapeTypeError } from '@src/core/errors/errors';
import { Shape } from '@src/entities/base/shape';

class DummyShape extends Shape {
  constructor() {
    super('Dummy');
  }
}

class DummyFactory {
  create(): Shape {
    return new DummyShape();
  }
}

describe('ShapeParser', () => {
  test('parses known shape using factory', () => {
    const registry = new ShapeFactoryRegistry();
    registry.register('DUMMY', new DummyFactory());

    const parser = new ShapeParser(registry);
    const shape = parser.parse('DUMMY 1,2,3');

    expect(shape).toBeInstanceOf(DummyShape);
    expect(shape.name).toBe('Dummy');
  });

  test('throws UnknownShapeTypeError for unknown type', () => {
    const registry = new ShapeFactoryRegistry(); // no registrations
    const parser = new ShapeParser(registry);

    expect(() => parser.parse('UNKNOWN 1,2')).toThrow(UnknownShapeTypeError);
  });

  test('throws UnknownShapeTypeError when factory returns null', () => {
    const registry = new ShapeFactoryRegistry();
    registry.register('NULLSHAPE', { create: () => null });

    const parser = new ShapeParser(registry);

    expect(() => parser.parse('NULLSHAPE some,data')).toThrow(UnknownShapeTypeError);
  });

  test('parses shape type in lowercase correctly', () => {
    const registry = new ShapeFactoryRegistry();
    registry.register('DUMMY', new DummyFactory());

    const parser = new ShapeParser(registry);
    const shape = parser.parse('dummy anything');

    expect(shape).toBeInstanceOf(DummyShape);
  });
});
