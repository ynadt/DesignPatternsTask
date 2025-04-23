// src/core/logger.ts
import pino from 'pino';
import { Paths } from '../config/paths';

export const Logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'SYS:standard' },
      },
      {
        target: 'pino/file',
        options: { destination: Paths.logFile, mkdir: true },
      },
    ],
  },
});
