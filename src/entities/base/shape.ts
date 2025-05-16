// src/entities/base/shape.ts
import { v4 as uuidv4 } from 'uuid';
import { Observer } from '@src/interfaces/observer.interface';
import { Observable } from '@src/interfaces/observable.interface';

export abstract class Shape implements Observable<Shape> {
  public readonly id: string;
  private observers: Observer<Shape>[] = [];

  protected constructor(public readonly name: string) {
    this.id = uuidv4();
  }

  subscribe(observer: Observer<Shape>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer<Shape>): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}
