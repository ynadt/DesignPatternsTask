// src/interfaces/shape-factory.interface.ts
import { Shape } from '../entities/base/shape';

export interface ShapeFactory {
  create(data: string): Shape | null;
}
