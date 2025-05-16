// src/domain/specifications/shape-specifications.ts
import { Shape } from '@src/entities/base/shape';
import { Rectangle } from '@src/entities/2d/rectangle';
import { Pyramid } from '@src/entities/3d/pyramid';
import { Point } from '@src/entities/base/point';
import { getDistance } from '@src/utils/geometry';
import { Specification } from '@src/interfaces/specification.interface';
import { Warehouse } from '@src/domain/repositories/warehouse';
import { ShapeMetrics } from '@src/interfaces/shape-metrics.interface';

export class IdSpecification implements Specification<Shape> {
  constructor(private id: string) {}
  isSatisfiedBy(shape: Shape): boolean {
    return shape.id === this.id;
  }
}

export class NameSpecification implements Specification<Shape> {
  constructor(private name: string) {}
  isSatisfiedBy(shape: Shape): boolean {
    return shape.name === this.name;
  }
}

export class FirstQuadrantSpecification implements Specification<Shape> {
  isSatisfiedBy(shape: Shape): boolean {
    let point: Point | undefined;

    if (shape instanceof Rectangle) {
      point = shape.points[0];
    } else if (shape instanceof Pyramid) {
      point = shape.basePoints[0];
    }

    if (!point) return false;

    return point.get(0) > 0 && point.get(1) > 0;
  }
}

export class SurfaceRangeSpecification implements Specification<Shape> {
  constructor(
    private warehouse: Warehouse,
    private minArea: number,
    private maxArea: number,
  ) {}

  isSatisfiedBy(shape: Shape): boolean {
    const data: ShapeMetrics | undefined = this.warehouse.get(shape);
    if (!data?.area) return false;
    return data.area >= this.minArea && data.area <= this.maxArea;
  }
}

export class DistanceRangeSpecification implements Specification<Shape> {
  constructor(
    private minDist: number,
    private maxDist: number,
  ) {}

  isSatisfiedBy(shape: Shape): boolean {
    let point: Point | undefined;

    if (shape instanceof Rectangle) {
      point = shape.points[0];
    } else if (shape instanceof Pyramid) {
      point = shape.basePoints[0];
    }

    if (!point) return false;

    const dist = getDistance(point, new Point(0, 0));
    return dist >= this.minDist && dist <= this.maxDist;
  }
}
