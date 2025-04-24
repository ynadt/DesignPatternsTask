import { CompositeValidator } from '@src/services/validation/composite-validator';
import { Validator } from '@src/interfaces/validator.interface';
import { ValidationResult } from '@src/interfaces/validation-result.interface';

describe('CompositeValidator', () => {
  const validResult: ValidationResult = { isValid: true };
  const invalidResult: ValidationResult = { isValid: false, reason: 'Invalid input' };

  const createMockValidator = (result: ValidationResult): Validator<unknown> => ({
    validate: jest.fn().mockReturnValue(result),
  });

  test('returns valid when all validators pass', () => {
    const validators = [createMockValidator(validResult), createMockValidator(validResult)];

    const composite = new CompositeValidator(validators);
    const result = composite.validate('any');

    expect(result).toEqual(validResult);
  });

  test('returns first failure when one validator fails', () => {
    const validators = [
      createMockValidator(validResult),
      createMockValidator(invalidResult),
      createMockValidator({ isValid: false, reason: 'Should not reach here' }),
    ];

    const composite = new CompositeValidator(validators);
    const result = composite.validate('any');

    expect(result).toEqual(invalidResult);
  });

  test('returns valid when no validators provided', () => {
    const composite = new CompositeValidator<unknown>([]);
    const result = composite.validate('anything');
    expect(result).toEqual({ isValid: true });
  });
});
