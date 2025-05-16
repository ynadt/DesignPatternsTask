// src/interfaces/observer.interface.ts
export interface Observer<T = unknown> {
  update(data: T): void;
}
