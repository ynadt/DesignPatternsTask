import { PyramidFactory } from '@src/factories/pyramid-factory';
import { Pyramid } from '@src/entities/3d/pyramid';
import { InvalidShapeDataError } from '@src/core/errors/errors';

describe('PyramidFactory', () => {
  const validator = {
    validate: jest.fn(() => ({ isValid: true })),
  };

  test('creates a valid pyramid', () => {
    const factory = new PyramidFactory(validator);
    const result = factory.create('0,0,0; 2,0,0; 1,1,0 | 1,0.5,2');
    expect(result).toBeInstanceOf(Pyramid);
  });

  test('throws error if validator returns invalid', () => {
    const invalidValidator = {
      validate: () => ({ isValid: false, reason: 'invalid base' }),
    };
    const factory = new PyramidFactory(invalidValidator);

    expect(() => factory.create('0,0,0; 2,0,0 | 1,0.5,2')).toThrow(InvalidShapeDataError);
  });
});
