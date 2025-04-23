// src/services/parsing/pyramid-data-parser.ts
import { parsePoints } from './point-parser';
import { PyramidData } from '../../interfaces/pyramid-data.interface';
import { InvalidShapeDataError } from '../../core/errors';

export class PyramidDataParser {
  static parse(data: string): PyramidData {
    const [baseStr, apexStr] = data.split('|');
    if (!baseStr || !apexStr) {
      throw new InvalidShapeDataError(`Missing base or apex in pyramid data: ${data}`);
    }

    const DIMENSION = 3;
    const basePoints = parsePoints(baseStr, DIMENSION);
    const apexPoints = parsePoints(apexStr, DIMENSION);

    if (apexPoints.length !== 1) {
      throw new InvalidShapeDataError(`Expected a single apex point: ${data}`);
    }

    return { base: basePoints, apex: apexPoints[0] };
  }
}
