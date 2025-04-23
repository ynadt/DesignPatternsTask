// src/services/geometry/rectangle-inspector.ts
import { Point } from '../../entities/base/point';
import { Rectangle } from '../../entities/2d/rectangle';
import { angleBetween, areColinear, crossProductZ, getDistance } from '../../utils/geometry';

export class RectangleInspector {
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

  isSquare(rect: Rectangle): boolean {
    if (!this.isRectangle(rect)) return false;
    const points = rect.points;

    const side = getDistance(points[0], points[1]);
    for (let i = 1; i < 4; i++) {
      const current = getDistance(points[i], points[(i + 1) % 4]);
      if (Math.abs(current - side) > 1e-6) return false;
    }

    return true;
  }

  isRhombus(rect: Rectangle): boolean {
    if (!this.isConvex(rect)) return false;
    const points = rect.points;

    const side = getDistance(points[0], points[1]);
    for (let i = 1; i < 4; i++) {
      const current = getDistance(points[i], points[(i + 1) % 4]);
      if (Math.abs(current - side) > 1e-6) return false;
    }

    return true;
  }

  isTrapezoid(rect: Rectangle): boolean {
    const p = rect.points;
    const isParallel = (a: Point, b: Point, c: Point, d: Point) => {
      const v1 = { x: b.get(0) - a.get(0), y: b.get(1) - a.get(1) };
      const v2 = { x: d.get(0) - c.get(0), y: d.get(1) - c.get(1) };
      return Math.abs(v1.x * v2.y - v1.y * v2.x) < 1e-6;
    };

    return isParallel(p[0], p[1], p[2], p[3]) || isParallel(p[1], p[2], p[3], p[0]);
  }

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
