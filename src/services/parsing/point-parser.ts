import { Point } from '@src/entities/base/point';
import { InvalidPointFormatError } from '@src/core/errors/errors';
import { PointValidator } from '../validation/point-validator';

export function parsePoints(input: string, dim: number): Point[] {
  return input.split(';').map((part) => {
    const coords = part
      .trim()
      .split(',')
      .map((s) => s.trim());

    if (!PointValidator.hasValidFormat(coords, dim)) {
      throw new InvalidPointFormatError(`Invalid ${dim}D point format: "${part}"`);
    }

    const values = coords.map(parseFloat);
    return new Point(...values);
  });
}
