var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify');

var { version } = require('./../package');


function banner() {
    return (
        `/** @license Apache 2.0 
* version ${version}
* febrest.development.js
*
* This source code is licensed under the Apache 2.0 license found in the
* LICENSE file in the root directory of this source tree.
*/`
    )
}
const inputOptions = {
    input: 'src/index.js',
    plugins: [
        babel({
            plugins: ['external-helpers'],
            externalHelpers: true,
        }),
        commonjs()
    ],
};
const inputMinOptions = {
    input: 'src/index.js',
    plugins: [
        babel({
            plugins: ['external-helpers'],
            externalHelpers: true,
        }),
        commonjs(),
        uglify()

    ],
};

const outputOptions = {
    format: 'umd',
    file: 'dist/febrest.js',
    sourcemap: true,
    banner: banner()
};

const outputMinOptions = {
    format: 'umd',
    file: 'dist/febrest.min.js',
    sourcemap: true,
};

async function build(){
    var result = await rollup.rollup(inputOptions);
    await result.write(outputOptions);
    result = await rollup.rollup(inputMinOptions);
    await result.write(outputMinOptions);
}
module.exports =  build;