// src/interfaces/shape-handler.interface.ts
import { Shape } from '../entities/base/shape';

export interface ShapeHandler {
  canHandle(shape: Shape): boolean;
  process(shape: Shape): Record<string, unknown>;
}
