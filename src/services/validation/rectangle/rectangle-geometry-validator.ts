// src/services/validation/rectangle/rectangle-geometry-validator.ts
import { Validator } from '@src/interfaces/validator.interface';
import { Point } from '@src/entities/base/point';
import { RectangleInspector } from '../../geometry/rectangle-inspector';
import { ValidationResult } from '@src/interfaces/validation-result.interface';

export class RectangleGeometryValidator implements Validator<Point[]> {
  private readonly inspector = new RectangleInspector();

  validate(points: Point[]): ValidationResult {
    if (!this.inspector.isRectangle({ points } as any)) {
      return { isValid: false, reason: 'Points do not form a valid rectangle' };
    }

    return { isValid: true };
  }
}
