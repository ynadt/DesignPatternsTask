// test/unit/domain/comparators/shape-comparators.test.ts
import {
  IdComparator,
  NameComparator,
  FirstPointXComparator,
  FirstPointYComparator,
} from '@src/domain/comparators/shape-comparators';
import { Shape } from '@src/entities/base/shape';
import { Rectangle } from '@src/entities/2d/rectangle';
import { Pyramid } from '@src/entities/3d/pyramid';
import { Point } from '@src/entities/base/point';

class DummyShape extends Shape {
  constructor(
    public override readonly id: string,
    name: string = 'Dummy',
  ) {
    super(name);
  }
}

describe('Shape Comparators', () => {
  describe('IdComparator', () => {
    const comp = new IdComparator();

    const shapeA = new DummyShape('a');
    const shapeB = new DummyShape('b');

    test('returns 0 for equal IDs', () => {
      expect(comp.compare(shapeA, shapeA)).toBe(0);
    });

    test('returns < 0 when a.id < b.id', () => {
      expect(comp.compare(shapeA, shapeB)).toBeLessThan(0);
    });

    test('returns > 0 when a.id > b.id', () => {
      expect(comp.compare(shapeB, shapeA)).toBeGreaterThan(0);
    });
  });

  describe('NameComparator', () => {
    const comp = new NameComparator();

    const shapeA = new DummyShape('1', 'Alpha');
    const shapeB = new DummyShape('2', 'Beta');

    test('returns 0 for equal names', () => {
      expect(comp.compare(shapeA, shapeA)).toBe(0);
    });

    test('returns < 0 when a.name < b.name', () => {
      expect(comp.compare(shapeA, shapeB)).toBeLessThan(0);
    });

    test('returns > 0 when a.name > b.name', () => {
      expect(comp.compare(shapeB, shapeA)).toBeGreaterThan(0);
    });
  });

  describe('FirstPointXComparator', () => {
    const comp = new FirstPointXComparator();

    const shapeA = new Rectangle([
      new Point(1, 0),
      new Point(1, 2),
      new Point(3, 2),
      new Point(3, 0),
    ]);
    const shapeB = new Rectangle([
      new Point(5, 0),
      new Point(5, 2),
      new Point(7, 2),
      new Point(7, 0),
    ]);

    test('returns 0 for equal X', () => {
      expect(comp.compare(shapeA, shapeA)).toBe(0);
    });

    test('returns < 0 when a.X < b.X', () => {
      expect(comp.compare(shapeA, shapeB)).toBeLessThan(0);
    });

    test('returns > 0 when a.X > b.X', () => {
      expect(comp.compare(shapeB, shapeA)).toBeGreaterThan(0);
    });
  });

  describe('FirstPointYComparator', () => {
    const comp = new FirstPointYComparator();

    const shapeA = new Pyramid(
      [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
      new Point(1, 1, 5),
    );
    const shapeB = new Pyramid(
      [new Point(0, 4, 0), new Point(1, 4, 0), new Point(2, 4, 0)],
      new Point(1, 4, 5),
    );

    test('returns 0 for equal Y', () => {
      expect(comp.compare(shapeA, shapeA)).toBe(0);
    });

    test('returns < 0 when a.Y < b.Y', () => {
      expect(comp.compare(shapeA, shapeB)).toBeLessThan(0);
    });

    test('returns > 0 when a.Y > b.Y', () => {
      expect(comp.compare(shapeB, shapeA)).toBeGreaterThan(0);
    });
  });
});
