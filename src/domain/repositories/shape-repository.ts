// src/domain/repositories/shape-repository.ts
import { Shape } from '@src/entities/base/shape';
import { Observer } from '@src/interfaces/observer.interface';
import { Specification } from '@src/interfaces/specification.interface';
import { Comparator } from '@src/interfaces/comparator.interface';

export class ShapeRepository {
  private shapes: Shape[] = [];
  private readonly observer?: Observer<Shape>;

  constructor(observer?: Observer<Shape>) {
    this.observer = observer;
  }

  add(shape: Shape): void {
    this.shapes.push(shape);
    if (this.observer) {
      shape.subscribe(this.observer);
      shape.notify();
    }
  }

  remove(id: string): void {
    const shapeToRemove = this.shapes.find((shape) => shape.id === id);
    if (!shapeToRemove) return;

    if (this.observer) {
      shapeToRemove.unsubscribe(this.observer);
    }

    this.shapes = this.shapes.filter((shape) => shape.id !== id);
  }

  findBySpecification(spec: Specification<Shape>): Shape[] {
    return this.shapes.filter((shape) => spec.isSatisfiedBy(shape));
  }

  sortBy(comparator: Comparator<Shape>): void {
    this.shapes.sort((a, b) => comparator.compare(a, b));
  }

  getAll(): Shape[] {
    return this.shapes;
  }
}
