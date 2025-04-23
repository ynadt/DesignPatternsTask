// src/core/container.ts
import { Logger } from './logger';
import { ErrorHandler } from './error-handler';

import { createFactoryRegistry } from '../config/factories/shape-factories';
import { createShapeHandlers } from '../config/handlers/shape-handlers';

import { ShapeParser } from '../services/parsing/shape-parser';
import { ShapeProcessorService } from '../services/shape-processor';
import { ShapeProcessorFacade } from '../services/shape-processor-facade';

export const container = (() => {
  const errorHandler = new ErrorHandler(Logger);

  const factoryRegistry = createFactoryRegistry();
  const shapeParser = new ShapeParser(factoryRegistry);

  const handlers = createShapeHandlers();
  const shapeProcessor = new ShapeProcessorService(handlers);

  const shapeFacade = new ShapeProcessorFacade(shapeParser, shapeProcessor, errorHandler);

  return {
    logger: Logger,
    errorHandler,
    shapeFacade,
  };
})();
