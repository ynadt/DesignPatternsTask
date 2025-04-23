// src/services/geometry/pyramid-inspector.ts
import { Pyramid } from '../../entities/3d/pyramid';

export class PyramidInspector {
  isValidPyramid(pyramid: Pyramid): boolean {
    const base = pyramid.basePoints;
    const apex = pyramid.apex;

    if (base.length < 3) return false;

    const unique = new Set(base.map((p) => p.toString()));
    if (unique.size !== base.length) return false;

    // Апекс не должен лежать в той же плоскости, что и основание
    const baseZ = base.map((p) => p.get(2) ?? 0);
    const apexZ = apex.get(2) ?? 0;

    return baseZ.some((z) => z !== apexZ);
  }

  isBaseOnPlane(pyramid: Pyramid, plane: 'XY' | 'YZ' | 'XZ'): boolean {
    const coordIndex = plane === 'XY' ? 2 : plane === 'YZ' ? 0 : 1;
    return pyramid.basePoints.every((p) => (p.get(coordIndex) ?? 0) === 0);
  }

  getSectionVolumeRatio(pyramid: Pyramid, plane: 'XY' | 'YZ' | 'XZ'): number {
    const height = Math.abs(pyramid.apex.get(this._axisIndex(plane)));
    if (!height) return 1;

    const apexCoord = pyramid.apex.get(this._axisIndex(plane)) ?? 0;
    const k = Math.abs(apexCoord) / height;
    return k ** 3;
  }

  private _axisIndex(plane: 'XY' | 'YZ' | 'XZ'): number {
    return plane === 'XY' ? 2 : plane === 'YZ' ? 0 : 1;
  }
}
