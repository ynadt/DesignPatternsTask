import { container } from '@src/core/container';
import * as loggerModule from '@src/core/logger';

describe('container', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shapeFacade.processLine logs info for valid shape', () => {
    const spy = jest.spyOn(loggerModule.Logger, 'info');

    const validLine = 'RECTANGLE 0,0; 0,2; 2,2; 2,0';
    container.shapeFacade.processLine(validLine);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'Rectangle',
        id: expect.any(String),
        area: expect.any(Number),
      }),
    );
  });

  test('shapeFacade.processLine handles unknown shape gracefully', () => {
    const spy = jest.spyOn(container.errorHandler, 'handle');

    const invalidLine = 'TRIANGLE 0,0; 1,0; 0,1';
    container.shapeFacade.processLine(invalidLine);

    expect(spy).toHaveBeenCalledWith(expect.any(Error), { line: invalidLine });
  });
});
