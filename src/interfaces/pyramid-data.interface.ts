// src/interfaces/pyramid-data.interface.ts
import { Point } from '../entities/base/point';

export interface PyramidData {
  base: Point[];
  apex: Point;
}
