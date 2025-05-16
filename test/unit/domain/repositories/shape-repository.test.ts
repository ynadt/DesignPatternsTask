// test/unit/domain/repositories/shape-repository.test.ts
import { ShapeRepository } from '@src/domain/repositories/shape-repository';
import { Shape } from '@src/entities/base/shape';
import { Specification } from '@src/interfaces/specification.interface';
import { Comparator } from '@src/interfaces/comparator.interface';
import { Observer } from '@src/interfaces/observer.interface';

class TestShape extends Shape {
  constructor(
    id: string,
    public readonly x: number,
  ) {
    super('TestShape');
    Object.defineProperty(this, 'id', { value: id });
  }
}

describe('ShapeRepository', () => {
  let repository: ShapeRepository;
  let observer: Observer<Shape>;

  beforeEach(() => {
    observer = {
      update: jest.fn(),
    };
    repository = new ShapeRepository(observer);
  });

  test('adds shape and subscribes observer', () => {
    const shape = new TestShape('1', 5);
    const subscribeSpy = jest.spyOn(shape, 'subscribe');
    const notifySpy = jest.spyOn(shape, 'notify');

    repository.add(shape);

    expect(repository.getAll()).toContain(shape);
    expect(subscribeSpy).toHaveBeenCalledWith(observer);
    expect(notifySpy).toHaveBeenCalled();
  });

  test('removes shape and unsubscribes observer', () => {
    const shape = new TestShape('1', 5);
    repository.add(shape);
    const unsubscribeSpy = jest.spyOn(shape, 'unsubscribe');

    repository.remove('1');

    expect(repository.getAll()).not.toContain(shape);
    expect(unsubscribeSpy).toHaveBeenCalledWith(observer);
  });

  test('does not fail if trying to remove nonexistent shape', () => {
    expect(() => repository.remove('nonexistent')).not.toThrow();
  });

  test('finds shapes by specification', () => {
    const s1 = new TestShape('1', 5);
    const s2 = new TestShape('2', 10);
    repository.add(s1);
    repository.add(s2);

    const spec: Specification<Shape> = {
      isSatisfiedBy: (shape) => (shape as TestShape).x > 5,
    };

    const result = repository.findBySpecification(spec);
    expect(result).toEqual([s2]);
  });

  test('sorts shapes using comparator', () => {
    const s1 = new TestShape('1', 5);
    const s2 = new TestShape('2', 3);
    const s3 = new TestShape('3', 8);
    repository.add(s1);
    repository.add(s2);
    repository.add(s3);

    const comparator: Comparator<Shape> = {
      compare: (a, b) => (a as TestShape).x - (b as TestShape).x,
    };

    repository.sortBy(comparator);

    const ids = repository.getAll().map((s) => s.id);
    expect(ids).toEqual(['2', '1', '3']);
  });
});
