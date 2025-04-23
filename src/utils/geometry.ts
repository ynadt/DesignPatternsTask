// src/utils/geometry.ts
import { Point } from '../entities/base/point';

export const EPSILON = 1e-6;

/**
 * Calculates the Euclidean distance between two n-dimensional points.
 */
export function getDistance(p1: Point, p2: Point): number {
  const sum = p1.coordinates.reduce((acc, _, i) => {
    const diff = (p2.coordinates[i] ?? 0) - (p1.coordinates[i] ?? 0);
    return acc + diff ** 2;
  }, 0);
  return Math.sqrt(sum);
}

/**
 * Returns the vector from one point to another.
 */
export function getVector(from: Point, to: Point): number[] {
  return from.coordinates.map((c, i) => (to.coordinates[i] ?? 0) - c);
}

/**
 * Checks if three points lie on a single straight line (2D only).
 */
export function areColinear(p1: Point, p2: Point, p3: Point): boolean {
  const [x1, y1] = p1.coordinates;
  const [x2, y2] = p2.coordinates;
  const [x3, y3] = p3.coordinates;
  const crossZ = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
  return Math.abs(crossZ) < Number.EPSILON;
}

/**
 * Calculates the Z-component of the cross product for two 2D vectors.
 */
export function crossProductZ(p1: Point, p2: Point, p3: Point): number {
  const v1 = getVector(p1, p2);
  const v2 = getVector(p2, p3);
  return v1[0] * v2[1] - v1[1] * v2[0];
}

/**
 * Calculates the angle (in radians) between two vectors from a common vertex.
 */
export function angleBetween(p1: Point, vertex: Point, p3: Point): number {
  const v1 = getVector(vertex, p1);
  const v2 = getVector(vertex, p3);

  const dot = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
  const mag1 = Math.hypot(...v1);
  const mag2 = Math.hypot(...v2);

  const cosTheta = dot / (mag1 * mag2);
  return Math.acos(Math.max(-1, Math.min(1, cosTheta)));
}

/**
 * Calculates the area of a simple polygon using the Shoelace formula.
 * Assumes 2D coordinates and that the polygon is non-intersecting.
 */
export function polygonArea(points: Point[]): number {
  let sum = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    sum += p1.get(0) * p2.get(1) - p2.get(0) * p1.get(1);
  }
  return Math.abs(sum) / 2;
}

/**
 * Checks if all sides between consecutive points are approximately equal.
 */
export function areAllSidesEqual(points: Point[]): boolean {
  const side = getDistance(points[0], points[1]);
  const n = points.length;

  for (let i = 1; i < n; i++) {
    const current = getDistance(points[i], points[(i + 1) % n]);
    if (Math.abs(current - side) > EPSILON) return false;
  }

  return true;
}

/**
 * Checks if two sides (AB and CD) are parallel.
 * Assumes points are in 2D.
 */
export function areSidesParallel(a: Point, b: Point, c: Point, d: Point): boolean {
  const v1 = { x: b.get(0) - a.get(0), y: b.get(1) - a.get(1) };
  const v2 = { x: d.get(0) - c.get(0), y: d.get(1) - c.get(1) };
  return Math.abs(v1.x * v2.y - v1.y * v2.x) < EPSILON;
}
