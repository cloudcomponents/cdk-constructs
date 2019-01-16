const glob = require('glob');

const pkgs = glob
  .sync('./packages/*')
  .map(p => p.replace(/^\./, '<rootDir>'))
  .map(p => `${p}/src`);

module.exports = {
  roots: pkgs,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node'
};
