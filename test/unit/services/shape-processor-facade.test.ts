import { ShapeProcessorFacade } from '@src/services/shape-processor-facade';
import { Shape } from '@src/entities/base/shape';

describe('ShapeProcessorFacade', () => {
  test('logs result of processed shape', () => {
    class TestShape extends Shape {
      constructor(name: string) {
        super(name);
      }
    }
    const shape = new TestShape('Dummy');

    const parseMock = jest.fn().mockReturnValue(shape);
    const processMock = jest.fn().mockReturnValue({ ok: true });
    const logMock = { info: jest.fn() };
    const errorHandlerMock = {
      logger: logMock,
      handle: jest.fn(),
    };

    const parser = {
      parse: parseMock,
    } as unknown as import('@src/services/parsing/shape-parser').ShapeParser;
    const processor = {
      process: processMock,
    } as unknown as import('@src/services/shape-processor-service').ShapeProcessorService;
    const errorHandler =
      errorHandlerMock as unknown as import('@src/core/errors/error-handler').ErrorHandler;

    const facade = new ShapeProcessorFacade(parser, processor, errorHandler);
    facade.processLine('DUMMY 1,2');

    expect(parseMock).toHaveBeenCalledWith('DUMMY 1,2');
    expect(processMock).toHaveBeenCalledWith(shape);
    expect(logMock.info).toHaveBeenCalledWith({ ok: true });
  });

  test('handles error during processing', () => {
    const error = new Error('parse failed');

    const parser = {
      parse: jest.fn(() => {
        throw error;
      }),
    } as unknown as import('@src/services/parsing/shape-parser').ShapeParser;

    const processor = {
      process: jest.fn(),
    } as unknown as import('@src/services/shape-processor-service').ShapeProcessorService;

    const errorHandler = {
      handle: jest.fn(),
      logger: { info: jest.fn() },
    } as unknown as import('@src/core/errors/error-handler').ErrorHandler;

    const facade = new ShapeProcessorFacade(parser, processor, errorHandler);
    facade.processLine('INVALID');

    expect(errorHandler.handle).toHaveBeenCalledWith(error, { line: 'INVALID' });
  });
});
