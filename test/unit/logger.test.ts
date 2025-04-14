// test/unit/logger.test.ts
import { logger } from '../../src/logger/logger.js';

describe('Logger Test', () => {
  it('should log info messages', () => {
    const spy = jest.spyOn(logger, 'info');
    logger.info('Test message');
    expect(spy).toHaveBeenCalledWith('Test message');
  });
});
