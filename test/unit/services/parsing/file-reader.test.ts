import fs from 'fs';
import { loadShapeDataFromFile } from '@src/services/parsing/file-reader';
import { ErrorHandler } from '@src/core/errors/error-handler';

jest.mock('fs');

const mockedReadFileSync = fs.readFileSync as jest.Mock;

describe('loadShapeDataFromFile', () => {
  const dummyPath = 'dummy/path.txt';

  test('returns trimmed, non-empty, non-comment lines', () => {
    mockedReadFileSync.mockReturnValue(`
      # This is a comment
      RECTANGLE 0,0; 0,2; 2,2; 2,0

      PYRAMID 0,0,0; 1,0,0; 0,1,0 | 0.5,0.5,1

      # Another comment
    `);

    const result = loadShapeDataFromFile(dummyPath);

    expect(result).toEqual([
      'RECTANGLE 0,0; 0,2; 2,2; 2,0',
      'PYRAMID 0,0,0; 1,0,0; 0,1,0 | 0.5,0.5,1',
    ]);
  });

  test('handles error and uses errorHandler', () => {
    const mockError = new Error('File not found');
    mockedReadFileSync.mockImplementation(() => {
      throw mockError;
    });

    const handle = jest.fn();
    const errorHandler: ErrorHandler = {
      handle,
      logger: console,
    } as any;

    const result = loadShapeDataFromFile(dummyPath, errorHandler);

    expect(handle).toHaveBeenCalledWith(mockError, { file: dummyPath });
    expect(result).toEqual([]);
  });

  test('throws error if no errorHandler provided', () => {
    mockedReadFileSync.mockImplementation(() => {
      throw new Error('Critical failure');
    });

    expect(() => loadShapeDataFromFile(dummyPath)).toThrow('Critical failure');
  });
});
