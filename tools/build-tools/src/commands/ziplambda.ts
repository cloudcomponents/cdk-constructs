import * as path from 'path';
import * as fs from 'fs-extra';
import { Command, command, metadata } from 'clime';

import { packDirectory } from '../pack-directory';

@command({
    description: 'This is a command for packing',
})
export default class extends Command {
    @metadata
    /* eslint-disable-next-line class-methods-use-this */
    public async execute(): Promise<void> {
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
    }
}
