import * as yargs from 'yargs';
import * as chalk from 'chalk';
import * as figlet from 'figlet';

import * as zipLambda from './commands/zip-lambda';
import * as create from './commands/create';

const NAME = 'cloudcomponents';

// eslint-disable-next-line no-console
console.log(chalk.red(figlet.textSync(NAME)), '\n');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json');

// eslint-disable-next-line no-unused-expressions
yargs
    .version(version)
    .scriptName(NAME)
    .help('help')
    .command(zipLambda)
    .command(create).argv;
