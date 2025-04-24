import { createShapeHandlers } from '@src/services/handlers/create-shape-handlers';
import { Rectangle } from '@src/entities/2d/rectangle';
import { Pyramid } from '@src/entities/3d/pyramid';
import { Point } from '@src/entities/base/point';

describe('createShapeHandlers', () => {
  test('returns an array with two shape handlers', () => {
    const handlers = createShapeHandlers();
    expect(handlers).toHaveLength(2);
  });

  test('handlers can handle correct shape types', () => {
    const handlers = createShapeHandlers();

    const rectangle = new Rectangle([
      new Point(0, 0),
      new Point(0, 2),
      new Point(2, 2),
      new Point(2, 0),
    ]);

    const pyramid = new Pyramid(
      [new Point(0, 0, 0), new Point(1, 0, 0), new Point(0.5, 1, 0)],
      new Point(0.5, 0.5, 2),
    );

    const rectangleHandler = handlers.find((h) => h.canHandle(rectangle));
    const pyramidHandler = handlers.find((h) => h.canHandle(pyramid));

    expect(rectangleHandler).toBeDefined();
    expect(pyramidHandler).toBeDefined();
  });

  test('handlers do not incorrectly claim unrelated shapes', () => {
    const handlers = createShapeHandlers();

    const unrelatedShape = { name: 'CustomShape', id: 'x' };

    const result = handlers.every((h) => !h.canHandle(unrelatedShape as any));
    expect(result).toBe(true);
  });
});
