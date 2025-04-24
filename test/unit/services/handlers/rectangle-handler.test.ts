import { RectangleHandler } from '@src/services/handlers/rectangle-handler';
import { Rectangle } from '@src/entities/2d/rectangle';
import { Point } from '@src/entities/base/point';

describe('RectangleHandler', () => {
  const rect = new Rectangle([new Point(0, 0), new Point(0, 2), new Point(2, 2), new Point(2, 0)]);

  test('processTyped returns geometry properties', () => {
    const handler = new RectangleHandler(
      { getArea: () => 4, getPerimeter: () => 8 },
      {
        isRectangle: () => true,
        isSquare: () => true,
        isRhombus: () => true,
        isTrapezoid: () => true,
        isConvex: () => true,
      },
    );

    const result = handler.processTyped(rect);

    expect(result).toMatchObject({
      type: 'Rectangle',
      id: rect.id,
      area: 4,
      perimeter: 8,
      isRectangle: true,
      isSquare: true,
      isRhombus: true,
      isTrapezoid: true,
      isConvex: true,
    });
  });
});
