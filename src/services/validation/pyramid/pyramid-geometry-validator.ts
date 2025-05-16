// src/services/validation/pyramid/pyramid-geometry-validator.ts
import { Validator } from '@src/interfaces/validator.interface';
import { PyramidData } from '@src/interfaces/pyramid-data.interface';
import { ValidationResult } from '@src/interfaces/validation-result.interface';
import { PyramidInspector } from '@src/services/geometry/pyramid-inspector';

export class PyramidGeometryValidator implements Validator<PyramidData> {
  private readonly inspector = new PyramidInspector();

  validate(data: PyramidData): ValidationResult {
    if (!this.inspector.isValidPyramidData(data)) {
      return { isValid: false, reason: 'Geometrically invalid pyramid' };
    }

    return { isValid: true };
  }
}
