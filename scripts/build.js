const rollup = require('./rollup');

const { version } = require('./../package');

const buildTypes = ['dev', 'prod'];

const entry = 'src/index.ts';
const name = 'Febrest';
const output = 'dist';
async function build() {
  await rollup(entry, output, name, version, 'dev');
  await rollup(entry, output, name, version, 'prod');
}
if (process.argv[2]) {
  build();
}
module.exports = build;
