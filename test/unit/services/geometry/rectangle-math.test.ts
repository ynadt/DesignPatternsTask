import { Rectangle } from '@src/entities/2d/rectangle';
import { Point } from '@src/entities/base/point';
import { RectangleMathService } from '@src/services/geometry/rectangle-math';

describe('RectangleMathService', () => {
  const service = new RectangleMathService();

  test('getArea returns correct area for square', () => {
    const points = [new Point(0, 0), new Point(0, 2), new Point(2, 2), new Point(2, 0)];
    const rectangle = new Rectangle(points);

    const result = service.getArea(rectangle);

    expect(result).toBe(4);
  });

  test('getPerimeter returns correct perimeter for square', () => {
    const points = [new Point(0, 0), new Point(0, 2), new Point(2, 2), new Point(2, 0)];
    const rectangle = new Rectangle(points);

    const result = service.getPerimeter(rectangle);

    expect(result).toBeCloseTo(8);
  });

  test('getArea returns 0 for degenerate rectangle (all points same)', () => {
    const p = new Point(1, 1);
    const rectangle = new Rectangle([p, p, p, p]);

    const result = service.getArea(rectangle);

    expect(result).toBe(0);
  });

  test('getPerimeter returns 0 for degenerate rectangle (all points same)', () => {
    const p = new Point(1, 1);
    const rectangle = new Rectangle([p, p, p, p]);

    const result = service.getPerimeter(rectangle);

    expect(result).toBe(0);
  });
});
