// src/services/shape-processor-facade.ts
import { ShapeParser } from './parsing/shape-parser';
import { ShapeProcessorService } from './shape-processor-service';
import { ErrorHandler } from '../core/errors/error-handler';
import { Logger } from '@src/core/logger';

/**
 * Facade that coordinates parsing and processing of shape lines,
 * and handles logging and error reporting.
 */
export class ShapeProcessorFacade {
  constructor(
    private readonly parser: ShapeParser, // Responsible for parsing a line into a Shape object
    private readonly processor: ShapeProcessorService, // Responsible for delegating processing to appropriate ShapeHandler
    private readonly errorHandler: ErrorHandler,
    private readonly logger: typeof Logger,
  ) {}

  /**
   * Processes a single line from the input:
   * - parses the line into a Shape
   * - processes the shape using its appropriate handler
   * - logs the result or handles any errors
   *
   * @param line Input string representing a shape definition
   */
  processLine(line: string): void {
    try {
      const shape = this.parser.parse(line);
      const result = this.processor.process(shape);
      this.logger.info(result);
    } catch (e) {
      this.errorHandler.handle(e, { line });
    }
  }
}
