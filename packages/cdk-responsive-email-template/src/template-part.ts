import * as fs from 'fs';
import * as path from 'path';

export abstract class TemplatePart {
  public static fromInline(source: string): TemplatePart {
    return {
      source,
    };
  }

  public static fromFile(filePath: string): TemplatePart {
    return {
      source: fs.readFileSync(filePath).toString('utf8'),
      defaultFilePath: path.dirname(filePath),
    };
  }

  abstract readonly source: string;

  abstract readonly defaultFilePath?: string;
}
