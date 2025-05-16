// src/domain/repositories/warehouse.ts
import { Shape } from '@src/entities/base/shape';
import { ShapeMetrics } from '@src/interfaces/shape-metrics.interface';

export class Warehouse {
  private static instance: Warehouse;

  private readonly shapeData = new Map<string, ShapeMetrics>();

  private constructor() {}

  public static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  add(shape: Shape): void {
    if (!this.shapeData.has(shape.id)) {
      this.shapeData.set(shape.id, {});
    }
  }

  remove(id: string): void {
    this.shapeData.delete(id);
  }

  get(shape: Shape): ShapeMetrics | undefined {
    return this.shapeData.get(shape.id);
  }

  setMetrics(id: string, metrics: ShapeMetrics): void {
    this.shapeData.set(id, metrics);
  }

  getAll(): Map<string, ShapeMetrics> {
    return this.shapeData;
  }
}
