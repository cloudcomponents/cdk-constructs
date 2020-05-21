import * as path from 'path';
import * as fs from 'fs-extra';
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import * as figlet from 'figlet';

import * as zipLambda from './commands/zip-lambda';
import * as create from './commands/create';

const NAME = 'cloudcomponents';

console.log(chalk.red(figlet.textSync(NAME)), '\n');

const { version } = fs.readJsonSync(path.join(__dirname, '..', 'package.json'));

yargs
    .version(version)
    .scriptName(NAME)
    .help('help')
    .command(zipLambda)
    .command(create).argv;
