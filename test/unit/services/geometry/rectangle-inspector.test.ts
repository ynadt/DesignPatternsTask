import { Rectangle } from '@src/entities/2d/rectangle';
import { Point } from '@src/entities/base/point';
import { RectangleInspector } from '@src/services/geometry/rectangle-inspector';

describe('RectangleInspector', () => {
  const inspector = new RectangleInspector();

  test('isRectangle returns true for valid rectangle', () => {
    const rect = new Rectangle([
      new Point(0, 0),
      new Point(0, 2),
      new Point(3, 2),
      new Point(3, 0),
    ]);

    expect(inspector.isRectangle(rect)).toBe(true);
  });

  test('isSquare returns true for square', () => {
    const square = new Rectangle([
      new Point(0, 0),
      new Point(0, 2),
      new Point(2, 2),
      new Point(2, 0),
    ]);

    expect(inspector.isSquare(square)).toBe(true);
  });

  test('isRhombus returns true for rhombus', () => {
    const rhombus = new Rectangle([
      new Point(0, 0),
      new Point(1, 1),
      new Point(2, 0),
      new Point(1, -1),
    ]);

    expect(inspector.isRhombus(rhombus)).toBe(true);
  });

  test('isTrapezoid returns true for trapezoid', () => {
    const trapezoid = new Rectangle([
      new Point(0, 0),
      new Point(1, 2),
      new Point(3, 2),
      new Point(4, 0),
    ]);

    expect(inspector.isTrapezoid(trapezoid)).toBe(true);
  });

  test('isConvex returns true for convex quadrilateral', () => {
    const convex = new Rectangle([
      new Point(0, 0),
      new Point(1, 2),
      new Point(3, 2),
      new Point(4, 0),
    ]);

    expect(inspector.isConvex(convex)).toBe(true);
  });

  test('isConvex returns false for concave quadrilateral', () => {
    const concave = new Rectangle([
      new Point(0, 0),
      new Point(2, 2),
      new Point(1, 1),
      new Point(2, 0),
    ]);

    expect(inspector.isConvex(concave)).toBe(false);
  });
});
