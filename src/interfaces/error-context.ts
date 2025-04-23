// src/interfaces/error-context.ts
export type ErrorContext = {
  line?: string;
  file?: string;
  [key: string]: unknown;
};
