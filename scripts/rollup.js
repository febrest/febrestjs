const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const prettier = require('rollup-plugin-prettier');
const path = require('path');
const fs = require('fs');

const getBanner = require('./banner')



function getFileName(name, bundleType) {
    switch (bundleType) {
        case 'dev':
            return `${name.toLowerCase()}.js`;
        case 'prod':
            return `${name.toLowerCase()}.min.js`;
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
    if(fs.existsSync(output)) {
        fs.unlinkSync(output);
    }
    await result.write(getOutputOptions(output,name,bundleType,{banner,intro:intro(version)}));
}
module.exports = build;