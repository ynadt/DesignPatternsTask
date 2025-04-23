// src/services/geometry/pyramid-math.ts
import { Pyramid } from '../../entities/3d/pyramid';
import { getDistance, polygonArea } from '../../utils/geometry';

export class PyramidMathService {
  /**
   * Calculates the area of the base polygon.
   */
  getBaseArea(pyramid: Pyramid): number {
    return polygonArea(pyramid.basePoints);
  }

  /**
   * Calculates the total surface area of the pyramid (base + sides).
   */
  getSurfaceArea(pyramid: Pyramid): number {
    const baseArea = this.getBaseArea(pyramid);
    const sideAreas = this.getSideAreas(pyramid);
    return baseArea + sideAreas;
  }

  /**
   * Calculates the total area of all triangular faces between base and apex.
   */
  getSideAreas(pyramid: Pyramid): number {
    let total = 0;
    const apex = pyramid.apex;
    const base = pyramid.basePoints;
    const n = base.length;

    for (let i = 0; i < n; i++) {
      const a = base[i];
      const b = base[(i + 1) % n];

      const ab = getDistance(a, b);
      const ap = getDistance(a, apex);
      const bp = getDistance(b, apex);

      const s = (ab + ap + bp) / 2;
      const area = Math.sqrt(s * (s - ab) * (s - ap) * (s - bp)); // Heron's formula
      total += area;
    }

    return total;
  }

  /**
   * Calculates the volume of the pyramid using the standard formula.
   */
  getVolume(pyramid: Pyramid): number {
    const baseArea = this.getBaseArea(pyramid);
    const height = this.getHeight(pyramid);
    return (1 / 3) * baseArea * height;
  }

  /**
   * Estimates the height of the pyramid as the Z-distance from apex to base plane.
   * Assumes base lies in XY plane.
   */
  getHeight(pyramid: Pyramid): number {
    return Math.abs(pyramid.apex.get(2) ?? 0);
  }
}
