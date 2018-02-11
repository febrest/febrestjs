var rollup = require('./rollup');

var { version } = require('./../package');

var buildTypes = ['dev','prod'];

var entry = 'src/index.js'
var name = 'Febrest';
var output = 'dist'
async function build(){
    await rollup(entry,output,name,version,'dev');
    await rollup(entry,output,name,version,'prod');
}

build();