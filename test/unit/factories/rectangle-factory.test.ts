import { RectangleFactory } from '@src/factories/rectangle-factory';
import { Rectangle } from '@src/entities/2d/rectangle';
import { InvalidShapeDataError } from '@src/core/errors/errors';

describe('RectangleFactory', () => {
  const validator = {
    validate: jest.fn(() => ({ isValid: true })),
  };

  test('creates a valid rectangle', () => {
    const factory = new RectangleFactory(validator);
    const result = factory.create('0,0; 0,2; 2,2; 2,0');
    expect(result).toBeInstanceOf(Rectangle);
    expect(result.points).toHaveLength(4);
  });

  test('throws error if validator returns invalid', () => {
    const invalidValidator = {
      validate: () => ({ isValid: false, reason: 'bad data' }),
    };

    const factory = new RectangleFactory(invalidValidator);

    expect(() => factory.create('0,0; 1,1')).toThrow(InvalidShapeDataError);
  });
});
