// src/services/validation/rectangle/rectangle-validator.ts
import { CompositeValidator } from '../composite-validator';
import { RectangleFormatValidator } from './rectangle-format-validator';
import { RectangleGeometryValidator } from './rectangle-geometry-validator';
import { Validator } from '@src/interfaces/validator.interface';
import { Point } from '@src/entities/base/point';

export const rectangleValidator: Validator<Point[]> = new CompositeValidator([
  new RectangleFormatValidator(),
  new RectangleGeometryValidator(),
]);
