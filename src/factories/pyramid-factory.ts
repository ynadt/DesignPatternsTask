import { Pyramid } from '../entities/3d/pyramid';
import { ShapeFactory } from '../interfaces/shape-factory.interface';
import { InvalidShapeDataError } from '../core/errors';
import { Validator } from '../interfaces/validator.interface';
import { PyramidData } from '../interfaces/pyramid-data.interface';
import { PyramidDataParser } from '../services/parsing/pyramid-data-parser';

export class PyramidFactory implements ShapeFactory {
  constructor(private readonly validator: Validator<PyramidData>) {}

  create(data: string): Pyramid {
    const shapeData = PyramidDataParser.parse(data);
    const result = this.validator.validate(shapeData);
    if (!result.isValid) {
      throw new InvalidShapeDataError(`Invalid pyramid data: ${result.reason ?? data}`);
    }
    return new Pyramid(shapeData.base, shapeData.apex);
  }
}
