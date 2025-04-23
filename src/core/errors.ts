// src/core/errors.ts

export class InvalidShapeDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidShapeDataError';
  }
}

export class UnknownShapeTypeError extends Error {
  constructor(shapeType: string) {
    super(`Unknown shape type: ${shapeType}`);
    this.name = 'UnknownShapeTypeError';
  }
}

export class InvalidPointFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPointFormatError';
  }
}
