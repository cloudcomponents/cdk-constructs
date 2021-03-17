import * as fs from 'fs';
import * as path from 'path';

export abstract class TemplateSource {
  public static fromInline(source: string): TemplateSource {
    return {
      source,
    };
  }

  public static fromFile(filePath: string): TemplateSource {
    return {
      source: fs.readFileSync(filePath).toString('utf8'),
      defaultFilePath: path.dirname(filePath),
    };
  }

  abstract readonly source: string;

  abstract readonly defaultFilePath?: string;
}
