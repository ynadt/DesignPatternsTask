// src/services/handlers/pyramid-handler.ts
import { Pyramid } from '@src/entities/3d/pyramid';
import { PyramidMathService } from '../geometry/pyramid-math';
import { PyramidInspector } from '../geometry/pyramid-inspector';
import { BaseShapeHandler } from './base-shape-handler';

export class PyramidHandler extends BaseShapeHandler<Pyramid> {
  constructor(
    private readonly math: PyramidMathService,
    private readonly inspector: PyramidInspector,
  ) {
    super(Pyramid);
  }

  processTyped(p: Pyramid): Record<string, unknown> {
    return {
      type: 'Pyramid',
      id: p.id,
      baseArea: this.math.getBaseArea(p),
      surfaceArea: this.math.getSurfaceArea(p),
      volume: this.math.getVolume(p),
      isValidPyramid: this.inspector.isValidPyramid(p),
      isBaseOnXY: this.inspector.isBaseOnPlane(p, 'XY'),
      volumeRatioIfCutByXY: this.inspector.getSectionVolumeRatio(p, 'XY'),
    };
  }
}
