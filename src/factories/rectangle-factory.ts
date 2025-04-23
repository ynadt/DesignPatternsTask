import { Rectangle } from '../entities/2d/rectangle';
import { ShapeFactory } from '../interfaces/shape-factory.interface';
import { parsePoints } from '../services/parsing/point-parser';
import { InvalidShapeDataError } from '../core/errors/errors';
import { Validator } from '../interfaces/validator.interface';
import { Point } from '../entities/base/point';

export class RectangleFactory implements ShapeFactory {
  constructor(private readonly validator: Validator<Point[]>) {}

  create(data: string): Rectangle {
    const points = parsePoints(data, 2);

    const result = this.validator.validate(points);
    if (!result.isValid) {
      throw new InvalidShapeDataError(`Invalid rectangle data: ${result.reason ?? data}`);
    }

    return new Rectangle(points);
  }
}
