// src/index.ts
import { logger } from './logger/logger.js';

class TestApp {
  static run() {
    logger.info('✅ TypeScript + Pino logger works!');
    logger.debug({
      env: process.env.NODE_ENV,
      type: 'module',
      testValue: Math.PI.toFixed(2),
    });

    return true;
  }
}

// Execute and export
export const result = TestApp.run();
console.log(result);
