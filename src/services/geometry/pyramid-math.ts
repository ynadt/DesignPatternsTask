// src/services/geometry/pyramid-math.ts
import { Pyramid } from '../../entities/3d/pyramid';
import { getDistance, polygonArea } from '../../utils/geometry';

export class PyramidMathService {
  getBaseArea(pyramid: Pyramid): number {
    return polygonArea(pyramid.basePoints);
  }

  getSurfaceArea(pyramid: Pyramid): number {
    const baseArea = this.getBaseArea(pyramid);
    const sideAreas = this.getSideAreas(pyramid);
    return baseArea + sideAreas;
  }

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
      const area = Math.sqrt(s * (s - ab) * (s - ap) * (s - bp));
      total += area;
    }

    return total;
  }

  getVolume(pyramid: Pyramid): number {
    const baseArea = this.getBaseArea(pyramid);
    const height = this.getHeight(pyramid);
    return (1 / 3) * baseArea * height;
  }

  getHeight(pyramid: Pyramid): number {
    return Math.abs(pyramid.apex.get(2) ?? 0);
  }
}
