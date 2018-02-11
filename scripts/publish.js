var fs = require('fs');
var child = require('child_process');
var readline = require('readline');

var argv = process.argv;
var package_json_path = './package.json';

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function publish() {
    var version = argv[2];
    var next;
    if (!version) {
        version = require('./../package').version;
        next = tag;
    } else {
        next = commit;
    }
    comfirmToNext(version, next);

}




function comfirmToNext(version, next) {
    rl.question('即将发布的版本是:' + version + ',是否继续？y/n\r\n', function (value) {
        value = value.toLowerCase();
        if (value === 'y' || value === 'yes') {
            rl.close();
            next(version);
            doPublish();
        } else if (value === 'n' || value === 'no') {
            process.exit(0)
        } else {
            console.log('输入错误，请重新输入');
            comfirmToNext(version, next)
        }
    });
}

function commit(version) {

    console.log('开始提交代码');
    var result = JSON.parse(fs.readFileSync(package_json_path).toString());
    result.version = version;
    fs.writeFileSync(package_json_path, JSON.stringify(result, null, 4));

    child.execSync('git add ' + package_json_path);
    try {
       child.execSync('git commit -m \"npm publish自动提交，version:' + version + '\"');
    } catch (e) {
        console.error('git commit error');
        process.exit(0);
    }
    tag(version);
}
function tag(version) {
    console.log('自动打tag');
    child.execSync('git tag -a febrest-release-v' + version + ' -m \'auto release tag '+version+'\'');
    child.execSync('git push --tags');
}

function doPublish(){
    console.log('开始发布');
    child.execSync('nrm use npm && npm publish && nrm use taobao');
    console.log('发布成功');
}
publish();