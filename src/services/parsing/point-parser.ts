import { Point } from '../../entities/base/point';
import { InvalidPointFormatError } from '../../core/errors/errors';
import { PointValidator } from '../validation/point-validator';

export function parsePoints(input: string, dim: number): Point[] {
  return input.split(';').map((part) => {
    const coords = part
      .trim()
      .split(',')
      .map((s) => s.trim());

    if (!PointValidator.hasValidFormat(coords, dim)) {
      throw new InvalidPointFormatError(`Неверный формат ${dim}D-точки: "${part}"`);
    }

    const values = coords.map(parseFloat);
    return new Point(...values);
  });
}
