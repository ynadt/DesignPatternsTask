// src/entities/base/shape.ts
import { v4 as uuidv4 } from 'uuid';

export abstract class Shape {
  public readonly id: string;

  constructor(public readonly name: string) {
    this.id = uuidv4();
  }
}
