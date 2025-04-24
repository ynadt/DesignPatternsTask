// src/services/handlers/rectangle-handler.ts
import { Rectangle } from '@src/entities/2d/rectangle';
import { BaseShapeHandler } from './base-shape-handler';
import { RectangleMathService } from '../geometry/rectangle-math';
import { RectangleInspector } from '../geometry/rectangle-inspector';

export class RectangleHandler extends BaseShapeHandler<Rectangle> {
  constructor(
    private readonly math: RectangleMathService,
    private readonly inspector: RectangleInspector,
  ) {
    super(Rectangle);
  }

  processTyped(r: Rectangle): Record<string, unknown> {
    return {
      type: 'Rectangle',
      id: r.id,
      area: this.math.getArea(r),
      perimeter: this.math.getPerimeter(r),
      isRectangle: this.inspector.isRectangle(r),
      isSquare: this.inspector.isSquare(r),
      isRhombus: this.inspector.isRhombus(r),
      isTrapezoid: this.inspector.isTrapezoid(r),
      isConvex: this.inspector.isConvex(r),
    };
  }
}
