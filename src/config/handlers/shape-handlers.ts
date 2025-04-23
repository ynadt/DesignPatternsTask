// src/config/handlers/shape-handlers.ts
import { ShapeHandler } from '../../interfaces/shape-handler.interface';
import { RectangleHandler } from '../../services/handlers/rectangle-handler';
import { PyramidHandler } from '../../services/handlers/pyramid-handler';
import { RectangleMathService } from '../../services/geometry/rectangle-math';
import { PyramidMathService } from '../../services/geometry/pyramid-math';
import { RectangleInspector } from '../../services/geometry/rectangle-inspector';
import { PyramidInspector } from '../../services/geometry/pyramid-inspector';

export function createShapeHandlers(): ShapeHandler[] {
  return [
    new RectangleHandler(new RectangleMathService(), new RectangleInspector()),
    new PyramidHandler(new PyramidMathService(), new PyramidInspector()),
  ];
}
