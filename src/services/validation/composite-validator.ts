// src/services/validation/composite-validator.ts
import { Validator } from '@src/interfaces/validator.interface';
import { ValidationResult } from '@src/interfaces/validation-result.interface';

export class CompositeValidator<T> implements Validator<T> {
  constructor(private readonly validators: Validator<T>[]) {}

  validate(input: T): ValidationResult {
    for (const validator of this.validators) {
      const result = validator.validate(input);
      if (!result.isValid) return result;
    }
    return { isValid: true };
  }
}
