// src/services/geometry/rectangle-inspector.ts
import { Rectangle } from '../../entities/2d/rectangle';
import {
  crossProductZ,
  angleBetween,
  areAllSidesEqual,
  areSidesParallel,
} from '../../utils/geometry';

export class RectangleInspector {
  /**
   * Checks if all interior angles of the shape are approximately 90 degrees.
   * This confirms that the shape is a rectangle (but not necessarily a square).
   */
  isRectangle(rect: Rectangle): boolean {
    const points = rect.points;
    if (points.length !== 4) return false;

    for (let i = 0; i < 4; i++) {
      const prev = points[(i + 3) % 4];
      const center = points[i];
      const next = points[(i + 1) % 4];

      const angle = angleBetween(prev, center, next);
      if (Math.abs(angle - Math.PI / 2) > 1e-6) return false;
    }

    return true;
  }

  /**
   * A square is a rectangle where all sides are equal.
   */
  isSquare(rect: Rectangle): boolean {
    return this.isRectangle(rect) && areAllSidesEqual(rect.points);
  }

  /**
   * A rhombus has all sides equal and is convex,
   * but does not require all angles to be right angles.
   */
  isRhombus(rect: Rectangle): boolean {
    return this.isConvex(rect) && areAllSidesEqual(rect.points);
  }

  /**
   * A trapezoid has at least one pair of opposite sides that are parallel.
   */
  isTrapezoid(rect: Rectangle): boolean {
    const p = rect.points;
    return areSidesParallel(p[0], p[1], p[2], p[3]) || areSidesParallel(p[1], p[2], p[3], p[0]);
  }

  /**
   * Checks if the polygon is convex.
   * All cross products between adjacent edge vectors must have the same sign.
   */
  isConvex(rect: Rectangle): boolean {
    const points = rect.points;
    const n = points.length;
    if (n < 4) return false;

    let lastSign = 0;
    for (let i = 0; i < n; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % n];
      const p3 = points[(i + 2) % n];

      const cross = crossProductZ(p1, p2, p3);
      const sign = Math.sign(cross);
      if (sign === 0) continue;

      if (lastSign === 0) {
        lastSign = sign;
      } else if (sign !== lastSign) {
        return false;
      }
    }

    return true;
  }
}
