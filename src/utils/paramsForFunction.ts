"use strict";
const $FEBREST_ARGSLIST$ = "$FEBREST_ARGSLIST$";

/**
 * 获取参数列表
 * 基本没啥用，参数名生产环境下都被会压缩
 */

const PARAMS_TEST_RE = /\(([\s\S]*?)\)/;

function paramsFromFunc(funcS: string) {
  let match = funcS.match(PARAMS_TEST_RE);
  if (match && match[1]) {
    /**
     * todo:可能有bug
     */
    let params;
    params = match[1].split(",").map(param => {
      let name = param.replace(/(\s|=.+$)/g, "");
      return name;
    });
    return params;
  }
  return;
}
/**
 *
 * @param {string} funcS
 * @description 从babel脚本编译过之后的代码中获取参数
 */
const PLUGIN_TEST_RE = /@providers\s+=\s+\[([\w\s\,]+)\]/;

function paramsFromPlugin(funcS: string) {
  if (PLUGIN_TEST_RE.test(funcS)) {
    return RegExp.$1.split(",").map(param => {
      let name = param.replace(/(\s|=.+$)/g, "");
      return name;
    });
  }
  return;
}

function paramsForFunction(func: any) {
  /**
   * @description 获取参数，动态加载依赖
   * 先判断func下是否有$FEBREST_ARGSLIST$属性，有的话直接获取
   * 其次判断方法体内是否有'@providers=[]'字段，获取
   * 再次直接通过函数名获取
   */

  let params = func[$FEBREST_ARGSLIST$];
  if (!params) {
    let funcS = func.toString();
    params = paramsFromPlugin(funcS) || paramsFromFunc(funcS) || undefined;
    func[$FEBREST_ARGSLIST$] = params;
  }
  return params;
}

export default paramsForFunction;
