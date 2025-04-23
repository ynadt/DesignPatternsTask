// src/services/validation/pyramid/pyramid-validator.ts
import { CompositeValidator } from '../composite-validator';
import { PyramidFormatValidator } from './pyramid-format-validator';
import { PyramidGeometryValidator } from './pyramid-geometry-validator';
import { Validator } from '../../../interfaces/validator.interface';
import { PyramidData } from '../../../interfaces/pyramid-data.interface';

export const pyramidValidator: Validator<PyramidData> = new CompositeValidator([
  new PyramidFormatValidator(),
  new PyramidGeometryValidator(),
]);
