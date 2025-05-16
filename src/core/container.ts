// src/core/container.ts
import { Logger } from './logger';
import { ErrorHandler } from './errors/error-handler';
import { defaultErrorHandlers } from './errors/default-error-handlers';

import { createFactoryRegistry } from '../factories/create-shape-factory-registry';
import { createShapeHandlers } from '../services/handlers/create-shape-handlers';

import { ShapeParser } from '../services/parsing/shape-parser';
import { ShapeProcessorService } from '../services/shape-processor-service';
import { ShapeProcessorFacade } from '../services/shape-processor-facade';

import { ShapeRepository } from '@src/domain/repositories/shape-repository';
import { Warehouse } from '@src/domain/repositories/warehouse';
import { ShapeDataStrategyRegistry } from '@src/strategies/strategy-registry';

import { RectangleMathService } from '@src/services/geometry/rectangle-math';
import { PyramidMathService } from '@src/services/geometry/pyramid-math';

import { ShapeObserver } from '@src/domain/observers/shape-observer';

export const container = (() => {
  const errorHandler = new ErrorHandler(Logger);
  errorHandler.registerMany(defaultErrorHandlers);

  const factoryRegistry = createFactoryRegistry();
  const shapeParser = new ShapeParser(factoryRegistry);

  const handlers = createShapeHandlers();
  const shapeProcessor = new ShapeProcessorService(handlers);

  const rectangleMath = new RectangleMathService();
  const pyramidMath = new PyramidMathService();

  const strategyRegistry = new ShapeDataStrategyRegistry(rectangleMath, pyramidMath);

  const warehouse = Warehouse.getInstance();

  const shapeObserver = new ShapeObserver(warehouse, strategyRegistry);

  const repository = new ShapeRepository(shapeObserver);

  const shapeFacade = new ShapeProcessorFacade(
    shapeParser,
    shapeProcessor,
    errorHandler,
    Logger,
    repository,
    warehouse,
    shapeObserver,
  );

  return {
    logger: Logger,
    errorHandler,
    shapeFacade,
    repository,
    warehouse,
    shapeObserver,
  };
})();
