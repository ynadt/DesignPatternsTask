// src/services/shape-processor-facade.ts
import { ShapeParser } from './parsing/shape-parser';
import { ShapeProcessorService } from './shape-processor';
import { ErrorHandler } from '../core/error-handler';

export class ShapeProcessorFacade {
  constructor(
    private readonly parser: ShapeParser,
    private readonly processor: ShapeProcessorService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  processLine(line: string): void {
    try {
      const shape = this.parser.parse(line);
      const result = this.processor.process(shape);
      this.errorHandler.logger.info(result);
    } catch (e) {
      this.errorHandler.handle(e, { line });
    }
  }
}
