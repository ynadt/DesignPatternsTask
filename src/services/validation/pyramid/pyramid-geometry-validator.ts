// src/services/validation/pyramid/pyramid-geometry-validator.ts
import { Validator } from '../../../interfaces/validator.interface';
import { PyramidData } from '../../../interfaces/pyramid-data.interface';
import { ValidationResult } from '../../../interfaces/validation-result.interface';
import { PyramidInspector } from '../../geometry/pyramid-inspector';
import { Pyramid } from '../../../entities/3d/pyramid';

export class PyramidGeometryValidator implements Validator<PyramidData> {
  private readonly inspector = new PyramidInspector();

  validate(data: PyramidData): ValidationResult {
    const shape = new Pyramid(data.base, data.apex);

    if (!this.inspector.isValidPyramid(shape)) {
      return { isValid: false, reason: 'Geometrically invalid pyramid' };
    }

    return { isValid: true };
  }
}
