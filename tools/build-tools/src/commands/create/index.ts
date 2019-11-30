import * as path from 'path';
import * as fs from 'fs-extra';

export const command = 'create';

export const describe = 'create';

export const builder = (yargs: any) => {
    const cwd = process.cwd();

    return yargs
        .option('name', {
            alias: 'n',
            default: 'cloudcomponent',
            type: 'string',
        })
        .option('dest', {
            alias: 'd',
            default: path.join(cwd, 'packages'),
            type: 'string',
        });
};

export const handler = (argv: any): void => {
    const templatePath = path.join(__dirname, '..', '..', '..', 'template');

    const destinationPath = path.join(argv.dest, argv.name);

    fs.mkdirSync(destinationPath);

    fs.copySync(templatePath, destinationPath);
};
