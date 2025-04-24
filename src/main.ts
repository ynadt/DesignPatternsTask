// src/main.ts
import { loadShapeDataFromFile } from './services/parsing/file-reader';
import { Paths } from './config/paths';
import { container } from './core/container';

export function run(): void {
  const { shapeFacade, errorHandler } = container;
  const lines = loadShapeDataFromFile(Paths.shapesFile, errorHandler);

  for (const line of lines) {
    shapeFacade.processLine(line);
  }
}

if (require.main === module) {
  run();
}
