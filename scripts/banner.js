module.exports = function banner(version, filename) {
    return (
        `/** @license Apache 2.0 
* version ${version}
* ${filename}
*
* This source code is licensed under the Apache 2.0 license found in the
* LICENSE file in the root directory of this source tree.
*/`
    )
}