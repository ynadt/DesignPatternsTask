// src/interfaces/validator.interface.ts
import { ValidationResult } from './validation-result.interface';

export interface Validator<T> {
  validate(input: T): ValidationResult;
}
