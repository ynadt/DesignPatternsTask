// src/domain/comparators/shape-comparators.ts
import { Comparator } from '@src/interfaces/comparator.interface';
import { Shape } from '@src/entities/base/shape';
import { getFirstPointX, getFirstPointY } from '@src/utils/geometry';

export class IdComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    return a.id.localeCompare(b.id);
  }
}

export class NameComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    return a.name.localeCompare(b.name);
  }
}

export class FirstPointXComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    const aX = getFirstPointX(a);
    const bX = getFirstPointX(b);
    return aX - bX;
  }
}

export class FirstPointYComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    const aY = getFirstPointY(a);
    const bY = getFirstPointY(b);
    return aY - bY;
  }
}
