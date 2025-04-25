import { ShapeProcessorFacade } from '@src/services/shape-processor-facade';
import { Shape } from '@src/entities/base/shape';
import { Logger as PinoLogger } from 'pino';
import { ShapeParser } from '@src/services/parsing/shape-parser';
import { ShapeProcessorService } from '@src/services/shape-processor-service';
import { ErrorHandler } from '@src/core/errors/error-handler';

describe('ShapeProcessorFacade', () => {
  const logMock = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    fatal: jest.fn(),
    trace: jest.fn(),
    level: 'info',
    child: jest.fn(() => logMock),
  } as unknown as PinoLogger;

  test('logs result of processed shape', () => {
    class TestShape extends Shape {
      constructor(name: string) {
        super(name);
      }
    }
    const shape = new TestShape('Dummy');

    const parseMock = jest.fn().mockReturnValue(shape);
    const processMock = jest.fn().mockReturnValue({ ok: true });

    const parser = { parse: parseMock } as unknown as ShapeParser;
    const processor = { process: processMock } as unknown as ShapeProcessorService;
    const errorHandler = {
      handle: jest.fn(),
    } as unknown as ErrorHandler;

    const facade = new ShapeProcessorFacade(parser, processor, errorHandler, logMock);
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
    } as unknown as ShapeParser;

    const processor = {
      process: jest.fn(),
    } as unknown as ShapeProcessorService;

    const errorHandler = {
      handle: jest.fn(),
    } as unknown as ErrorHandler;

    const facade = new ShapeProcessorFacade(parser, processor, errorHandler, logMock);
    facade.processLine('INVALID');

    expect(errorHandler.handle).toHaveBeenCalledWith(error, { line: 'INVALID' });
  });
});
