// src/services/shape-processor-facade.ts
import { ShapeParser } from './parsing/shape-parser';
import { ShapeProcessorService } from './shape-processor-service';
import { ErrorHandler } from '../core/errors/error-handler';
import { Logger } from '@src/core/logger';
import { ShapeRepository } from '@src/domain/repositories/shape-repository';
import { Warehouse } from '@src/domain/repositories/warehouse';
import { ShapeObserver } from '@src/domain/observers/shape-observer';

export class ShapeProcessorFacade {
  constructor(
    private readonly parser: ShapeParser,
    private readonly processor: ShapeProcessorService,
    private readonly errorHandler: ErrorHandler,
    private readonly logger: typeof Logger,
    private readonly repository: ShapeRepository,
    private readonly warehouse: Warehouse,
    private readonly shapeObserver: ShapeObserver,
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

      this.repository.add(shape);
      this.warehouse.add(shape);

      const result = this.processor.process(shape);
      this.logger.info(result);
    } catch (e) {
      this.errorHandler.handle(e, { line });
    }
  }

  /**
   * Removes a shape by its ID:
   * - removes it from the repository (and unsubscribes the observer)
   * - removes the associated metrics from the warehouse
   */
  removeById(id: string): void {
    this.repository.remove(id);
    this.warehouse.remove(id);
  }
}
