// src/core/shape-handlers.ts
import { ShapeHandler } from '../../interfaces/shape-handler.interface';
import { RectangleHandler } from './rectangle-handler';
import { PyramidHandler } from './pyramid-handler';
import { RectangleMathService } from '../geometry/rectangle-math';
import { PyramidMathService } from '../geometry/pyramid-math';
import { RectangleInspector } from '../geometry/rectangle-inspector';
import { PyramidInspector } from '../geometry/pyramid-inspector';

export function createShapeHandlers(): ShapeHandler[] {
  return [
    new RectangleHandler(new RectangleMathService(), new RectangleInspector()),
    new PyramidHandler(new PyramidMathService(), new PyramidInspector()),
  ];
}
