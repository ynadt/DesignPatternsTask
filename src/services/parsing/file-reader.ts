// src/services/parsing/file-reader.ts
import { ErrorHandler } from '@src/core/errors/error-handler';
import { readFileContent } from '@src/utils/parsing/read-file-content';
import { parseLines } from '@src/utils/parsing/parse-lines';

export function loadShapeDataFromFile(filePath: string, errorHandler?: ErrorHandler): string[] {
  try {
    const content = readFileContent(filePath);
    return parseLines(content);
  } catch (error) {
    if (errorHandler) {
      errorHandler.handle(error, { file: filePath });
      return [];
    }
    throw error;
  }
}
