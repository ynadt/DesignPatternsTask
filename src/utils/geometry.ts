// src/utils/geometry.ts
import { Point } from '../entities/base/point';

export function getDistance(p1: Point, p2: Point): number {
  const sum = p1.coordinates.reduce((acc, _, i) => {
    const diff = (p2.coordinates[i] ?? 0) - (p1.coordinates[i] ?? 0);
    return acc + diff ** 2;
  }, 0);
  return Math.sqrt(sum);
}

export function getVector(from: Point, to: Point): number[] {
  return from.coordinates.map((c, i) => (to.coordinates[i] ?? 0) - c);
}

export function areColinear(p1: Point, p2: Point, p3: Point): boolean {
  // 2D only (for rectangles)
  const [x1, y1] = p1.coordinates;
  const [x2, y2] = p2.coordinates;
  const [x3, y3] = p3.coordinates;
  const crossZ = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
  return Math.abs(crossZ) < Number.EPSILON;
}

export function crossProductZ(p1: Point, p2: Point, p3: Point): number {
  const v1 = getVector(p1, p2);
  const v2 = getVector(p2, p3);
  return v1[0] * v2[1] - v1[1] * v2[0];
}

export function angleBetween(p1: Point, vertex: Point, p3: Point): number {
  const v1 = getVector(vertex, p1);
  const v2 = getVector(vertex, p3);

  const dot = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
  const mag1 = Math.sqrt(v1.reduce((sum, val) => sum + val ** 2, 0));
  const mag2 = Math.sqrt(v2.reduce((sum, val) => sum + val ** 2, 0));

  const cosTheta = dot / (mag1 * mag2);
  return Math.acos(Math.max(-1, Math.min(1, cosTheta)));
}

export function polygonArea(points: Point[]): number {
  // 2D only (for rectangles)
  let sum = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    sum += p1.get(0) * p2.get(1) - p2.get(0) * p1.get(1);
  }
  return Math.abs(sum) / 2;
}
