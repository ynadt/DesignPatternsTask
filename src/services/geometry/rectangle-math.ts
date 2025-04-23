// src/services/geometry/rectangle-math.ts
import { Rectangle } from '../../entities/2d/rectangle';
import { getDistance, polygonArea } from '../../utils/geometry';

export class RectangleMathService {
  /**
   * Calculates the area of a rectangle using the shoelace formula.
   * Assumes the rectangle is defined in 2D space.
   */
  getArea(rect: Rectangle): number {
    return polygonArea(rect.points);
  }

  /**
   * Calculates the perimeter by summing the distances between consecutive points.
   */
  getPerimeter(rect: Rectangle): number {
    const points = rect.points;
    const n = points.length;
    let perimeter = 0;
    for (let i = 0; i < n; i++) {
      perimeter += getDistance(points[i], points[(i + 1) % n]);
    }
    return perimeter;
  }
}
