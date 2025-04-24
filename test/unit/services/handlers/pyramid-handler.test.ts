import { PyramidHandler } from '@src/services/handlers/pyramid-handler';
import { Pyramid } from '@src/entities/3d/pyramid';
import { Point } from '@src/entities/base/point';
import { PyramidInspector } from '@src/services/geometry/pyramid-inspector';

describe('PyramidHandler', () => {
  const base = [new Point(0, 0, 0), new Point(2, 0, 0), new Point(1, 1, 0)];
  const apex = new Point(1, 0.5, 2);
  const pyramid = new Pyramid(base, apex);

  test('processTyped returns geometry properties', () => {
    const handler = new PyramidHandler(
      {
        getBaseArea: () => 3,
        getSurfaceArea: () => 10,
        getVolume: () => 6,
        getHeight: () => 2,
        getSideAreas: () => 7,
      },
      new PyramidInspector(),
    );

    const result = handler.processTyped(pyramid);

    expect(result).toMatchObject({
      type: 'Pyramid',
      id: pyramid.id,
      baseArea: 3,
      surfaceArea: 10,
      volume: 6,
      isValidPyramid: true,
      isBaseOnXY: true,
      volumeRatioIfCutByXY: 1,
    });
  });
});
