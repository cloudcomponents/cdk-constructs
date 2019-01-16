import * as path from 'path';
import { Command, command, metadata } from 'clime';

import { packDirectory } from '../pack-directory';

@command({
  description: 'This is a command for packing'
})
export default class extends Command {
  @metadata
  async execute() {
    try {
      const cwd = process.cwd();
      const pkg = require(path.join(cwd, 'package.json'));

      const { lambdaDependencies } = pkg;

      Object.keys(lambdaDependencies).forEach(async lambdaPkg => {
        const lambdaSrc = path.join(
          cwd,
          'node_modules',
          ...lambdaPkg.split('/')
        );

        const lambdaDest = path.join(
          cwd,
          'lambda',
          lambdaDependencies[lambdaPkg]
        );

        await packDirectory(lambdaSrc, lambdaDest);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
