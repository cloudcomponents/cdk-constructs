import * as path from 'path';
import * as archiver from 'archiver';
import * as fs from 'fs-extra';
import * as packlist from 'npm-packlist';

export async function packDirectory(path: string, outputFile: string) {
  const files = await packlist({ path });
  return zipFiles(files, path, outputFile);
}

function zipFiles(
  files: string[],
  source: string,
  outputFile: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputFile);
    const archive = archiver('zip');

    files.forEach(file => {
      const filePath = path.join(source, file);
      archive.file(filePath, { name: file });
    });

    archive.pipe(output);
    archive.finalize();

    archive.on('warning', reject);
    archive.on('error', reject);

    output.once('close', () => resolve());
  });
}
