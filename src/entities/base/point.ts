// src/entities/base/point.ts

export class Point {
  public readonly coordinates: number[];

  constructor(...coordinates: number[]) {
    this.coordinates = coordinates;
  }

  get dimension(): number {
    return this.coordinates.length;
  }

  get(index: number): number {
    return this.coordinates[index];
  }

  toString(): string {
    return `(${this.coordinates.join(', ')})`;
  }
}
