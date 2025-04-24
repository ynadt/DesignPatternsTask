// test/unit/main.test.ts
import { run } from '../../src/main';
import * as fileReader from '../../src/services/parsing/file-reader';
import { container } from '../../src/core/container';

jest.mock('../../src/services/parsing/file-reader', () => ({
  loadShapeDataFromFile: jest.fn(),
}));

describe('main.ts run()', () => {
  it('calls processLine for each shape line', () => {
    const spy = jest.spyOn(container.shapeFacade, 'processLine');
    (fileReader.loadShapeDataFromFile as jest.Mock).mockReturnValue([
      'RECTANGLE 0,0; 0,2; 2,2; 2,0',
      'PYRAMID 0,0,0; 2,0,0; 1,1,0 | 1,0.5,1',
    ]);

    run();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('RECTANGLE 0,0; 0,2; 2,2; 2,0');
    expect(spy).toHaveBeenCalledWith('PYRAMID 0,0,0; 2,0,0; 1,1,0 | 1,0.5,1');
  });
});
