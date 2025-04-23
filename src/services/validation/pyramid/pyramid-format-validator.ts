import { Validator } from '../../../interfaces/validator.interface';
import { ValidationResult } from '../../../interfaces/validation-result.interface';
import { PyramidData } from '../../../interfaces/pyramid-data.interface';
import { PointValidator } from '../point-validator';

export class PyramidFormatValidator implements Validator<PyramidData> {
  validate(data: PyramidData): ValidationResult {
    const { base, apex } = data;
    const expectedDim = 3;

    if (base.length < 3) {
      return { isValid: false, reason: 'Base must have at least 3 points' };
    }

    if (!PointValidator.isValid(apex, expectedDim)) {
      return { isValid: false, reason: 'Invalid apex point' };
    }

    if (!PointValidator.isArrayValid(base, expectedDim)) {
      return { isValid: false, reason: 'Invalid base points' };
    }

    return { isValid: true };
  }
}
