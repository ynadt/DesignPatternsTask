import {
  InvalidShapeDataError,
  UnknownShapeTypeError,
  InvalidPointFormatError,
} from '@src/core/errors/errors';

describe('Custom Error Classes', () => {
  test('InvalidShapeDataError sets name and message correctly', () => {
    const error = new InvalidShapeDataError('Invalid shape structure');
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Invalid shape structure');
    expect(error.name).toBe('InvalidShapeDataError');
  });

  test('UnknownShapeTypeError sets name and message correctly', () => {
    const error = new UnknownShapeTypeError('TRIANGLE');
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Unknown shape type: TRIANGLE');
    expect(error.name).toBe('UnknownShapeTypeError');
  });

  test('InvalidPointFormatError sets name and message correctly', () => {
    const error = new InvalidPointFormatError('Invalid 2D point');
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Invalid 2D point');
    expect(error.name).toBe('InvalidPointFormatError');
  });
});
