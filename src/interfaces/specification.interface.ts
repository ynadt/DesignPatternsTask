// src/interfaces/specification.interface.ts
export interface Specification<T> {
  isSatisfiedBy(item: T): boolean;
}
