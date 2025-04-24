import { Shape } from '@src/entities/base/shape';
import { BaseShapeHandler } from '@src/services/handlers/base-shape-handler';

class DummyShape extends Shape {
  constructor() {
    super('Dummy');
  }
}

class DummyHandler extends BaseShapeHandler<DummyShape> {
  constructor() {
    super(DummyShape);
  }

  processTyped(shape: DummyShape): Record<string, unknown> {
    return { processed: true };
  }
}

describe('BaseShapeHandler', () => {
  test('canHandle returns true for matching shape type', () => {
    const handler = new DummyHandler();
    const shape = new DummyShape();

    expect(handler.canHandle(shape)).toBe(true);
  });

  test('canHandle returns false for non-matching shape', () => {
    class OtherShape extends Shape {
      constructor() {
        super('Other');
      }
    }

    const handler = new DummyHandler();
    const shape = new OtherShape();

    expect(handler.canHandle(shape)).toBe(false);
  });

  test('process delegates to processTyped', () => {
    const handler = new DummyHandler();
    const result = handler.process(new DummyShape());

    expect(result).toEqual({ processed: true });
  });
});
