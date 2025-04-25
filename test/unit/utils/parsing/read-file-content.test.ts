// test/unit/utils/parsing/read-file-content.test.ts
import fs from 'fs';
import { readFileContent } from '@src/utils/parsing/read-file-content';

jest.mock('fs');

describe('readFileContent', () => {
  test('returns file content as string', () => {
    const mockContent = 'RECTANGLE 0,0; 0,1; 1,1; 1,0';
    (fs.readFileSync as jest.Mock).mockReturnValue(mockContent);

    const filePath = 'shapes.txt';
    const result = readFileContent(filePath);

    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf-8');
    expect(result).toBe(mockContent);
  });
});
