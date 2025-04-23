// src/factories/shape-factory-registry.ts

import { ShapeFactory } from '../interfaces/shape-factory.interface';

export class ShapeFactoryRegistry {
  private readonly factories = new Map<string, ShapeFactory>();

  register(type: string, factory: ShapeFactory): void {
    this.factories.set(type.toUpperCase(), factory);
  }

  getFactory(type: string): ShapeFactory | undefined {
    return this.factories.get(type.toUpperCase());
  }
}
