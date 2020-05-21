import * as path from 'path';
import * as fs from 'fs-extra';

import { packDirectory } from './pack-directory';

export const command = 'zip-lambda';

export const describe = 'zip a lambda';

export const handler = (): void => {
  try {
    const cwd = process.cwd();
    const pkg = JSON.parse(
      fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'),
    );
    // const pkg = require(path.join(cwd, 'package.json'));

    const { lambdaDependencies } = pkg;

    Object.keys(lambdaDependencies).forEach(
      async (lambdaPkg): Promise<void> => {
        const lambdaSrc = path.join(
          cwd,
          'node_modules',
          ...lambdaPkg.split('/'),
        );

        // const lambda = await hashElement(lambdaSrc, {
        //     folders: { exclude: ['node_modules', 'src'] },
        // });

        // console.log(lambda.hash);

        const lambdaDest = path.join(
          cwd,
          'lambda',
          lambdaDependencies[lambdaPkg],
        );

        if (!(await fs.pathExists(lambdaDest))) {
          await fs.createFile(lambdaDest);
        }

        await packDirectory(lambdaSrc, lambdaDest);
      },
    );
  } catch (error) {
    throw new Error(error);
  }
};
