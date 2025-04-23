// src/services/geometry/pyramid-inspector.ts
import { Pyramid } from '../../entities/3d/pyramid';
import { EPSILON } from '../../utils/geometry';

export class PyramidInspector {
  /**
   * Checks if the pyramid is geometrically valid:
   * - base has at least 3 points,
   * - all base points are unique,
   * - apex is not coplanar with base.
   */
  isValidPyramid(pyramid: Pyramid): boolean {
    const base = pyramid.basePoints;
    const apex = pyramid.apex;

    if (base.length < 3) return false;

    const unique = new Set(base.map((p) => p.toString()));
    if (unique.size !== base.length) return false;

    const baseZ = base.map((p) => p.get(2) ?? 0);
    const apexZ = apex.get(2) ?? 0;

    return baseZ.some((z) => Math.abs(z - apexZ) > EPSILON);
  }

  /**
   * Checks if the base lies flat on a given coordinate plane (XY, YZ, or XZ).
   */
  isBaseOnPlane(pyramid: Pyramid, plane: 'XY' | 'YZ' | 'XZ'): boolean {
    const coordIndex = this._axisIndex(plane);
    return pyramid.basePoints.every((p) => Math.abs(p.get(coordIndex) ?? 0) < EPSILON);
  }

  /**
   * Returns the volume ratio between the full pyramid and the section cut by a plane.
   * Based on the proportion of the apex's coordinate relative to the pyramid height.
   */
  getSectionVolumeRatio(pyramid: Pyramid, plane: 'XY' | 'YZ' | 'XZ'): number {
    const axis = this._axisIndex(plane);
    const height = Math.abs(pyramid.apex.get(axis) ?? 0);
    if (height < EPSILON) return 1;

    const coord = Math.abs(pyramid.apex.get(axis) ?? 0);
    const k = coord / height;
    return k ** 3;
  }

  /**
   * Returns the coordinate index corresponding to a given plane.
   */
  private _axisIndex(plane: 'XY' | 'YZ' | 'XZ'): number {
    return plane === 'XY' ? 2 : plane === 'YZ' ? 0 : 1;
  }
}
