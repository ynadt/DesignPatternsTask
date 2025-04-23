// src/services/parsing/file-reader.ts
import fs from 'fs';
import { ErrorHandler } from '../../core/error-handler';

export function loadShapeDataFromFile(filePath: string, errorHandler?: ErrorHandler): string[] {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content
      .split('\n')
      .filter((line) => !line.startsWith('#'))
      .map((line) => line.trim())
      .filter(Boolean);
  } catch (error) {
    if (errorHandler) {
      errorHandler.handle(error, { file: filePath });
    } else {
      throw error;
    }
    return [];
  }
}
