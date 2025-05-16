//src/interfaces/observable.interface.ts
import { Observer } from './observer.interface';

export interface Observable<T = unknown> {
  subscribe(observer: Observer<T>): void;
  unsubscribe(observer: Observer<T>): void;
  notify(): void;
}
