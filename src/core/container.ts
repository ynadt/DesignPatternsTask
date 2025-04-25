// src/core/container.ts
import { Logger } from './logger';
import { ErrorHandler } from './errors/error-handler';
import { defaultErrorHandlers } from './errors/default-error-handlers';

import { createFactoryRegistry } from '../factories/create-shape-factory-registry';
import { createShapeHandlers } from '../services/handlers/create-shape-handlers';

import { ShapeParser } from '../services/parsing/shape-parser';
import { ShapeProcessorService } from '../services/shape-processor-service';
import { ShapeProcessorFacade } from '../services/shape-processor-facade';

export const container = (() => {
  const errorHandler = new ErrorHandler(Logger);
  errorHandler.registerMany(defaultErrorHandlers);

  const factoryRegistry = createFactoryRegistry();
  const shapeParser = new ShapeParser(factoryRegistry);

  const handlers = createShapeHandlers();
  const shapeProcessor = new ShapeProcessorService(handlers);

  const shapeFacade = new ShapeProcessorFacade(shapeParser, shapeProcessor, errorHandler, Logger);

  return {
    logger: Logger,
    errorHandler,
    shapeFacade,
  };
})();
