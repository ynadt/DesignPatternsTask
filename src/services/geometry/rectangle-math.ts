// src/services/geometry/rectangle-math.ts
import { Rectangle } from '../../entities/2d/rectangle';
import { getDistance, polygonArea } from '../../utils/geometry';

export class RectangleMathService {
  getArea(rect: Rectangle): number {
    return polygonArea(rect.points);
  }

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
