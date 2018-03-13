var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify');
var prettier = require('rollup-plugin-prettier');
var path = require('path');

var getBanner = require('./banner')



function getFileName(name, bundleType) {
    switch (bundleType) {
        case 'dev':
            return `${name}.js`;
        case 'prod':
            return `${name}.min.js`;
    }
}

function getPlugins(bundleType) {
    return [
        babel({ runtimeHelpers: true }),
        commonjs(),
        bundleType === 'prod' ? uglify() : prettier
    ]
}
function getOutputOptions(output, name, bundleType, exts) {
    var format = 'umd';
    var file = output;
    return {
        file,
        format,
        name,
        ...exts
    }
}

function intro(version){
    return 'var VERSION = \''+ version+'\'';
}


async function build(entry, output, name, version, bundleType) {
    var result = await rollup.rollup({
        input: entry,
        plugins:getPlugins(bundleType)
    });
    var filename = getFileName(name, bundleType);
    output = path.resolve(output, filename);
    var banner = '';
    if (bundleType === 'dev') {
        banner = getBanner(version,filename);
    }

    await result.write(getOutputOptions(output,name,bundleType,{banner,intro:intro(version)}));
}
module.exports = build;