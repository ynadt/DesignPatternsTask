import { ShapeProcessorService } from '@src/services/shape-processor-service';
import { Shape } from '@src/entities/base/shape';
import { ShapeHandler } from '@src/interfaces/shape-handler.interface';

class DummyShape extends Shape {
  constructor() {
    super('Dummy');
  }
}

describe('ShapeProcessorService', () => {
  test('returns processed result from matching handler', () => {
    const dummy = new DummyShape();
    const handler: ShapeHandler = {
      canHandle: (shape) => shape instanceof DummyShape,
      process: (shape) => ({ processed: true, id: shape.id }),
    };

    const service = new ShapeProcessorService([handler]);
    const result = service.process(dummy);

    expect(result).toEqual({ processed: true, id: dummy.id });
  });

  test('returns warning if no handler found', () => {
    const shape = new DummyShape();
    const service = new ShapeProcessorService([]);

    const result = service.process(shape);

    expect(result).toEqual({
      type: 'Dummy',
      id: shape.id,
      warning: 'Unsupported shape type',
    });
  });
});
