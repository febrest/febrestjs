"use strict";

import { runTransaction, series } from "./Transaction";

import Resolver from "./Resolver";
import paramsForFunction from "./paramsForFunction";

function isObject(v: any) {
  return Object.prototype.toString.call(v) === "[object Object]";
}
function isPromise(v: any) {
  if (typeof Promise !== "undefined" && v instanceof Promise) {
    return true;
  } else {
    return false;
  }
}
function merge(...data: any[]) {
  let dest: any;
  if (Array.isArray(data[0])) {
    dest = [];
    data.forEach(d => {
      dest = dest.concat(d);
    });
  } else {
    dest = {};
    data.forEach(d => {
      for (let o in d) {
        dest[o] = d[o];
      }
    });
  }
  return dest;
}
function copy(source: any): any {
  let dest: any;
  if (Array.isArray(source)) {
    dest = source.map(v => {
      return copy(v);
    });
  } else if (isObject(source)) {
    dest = {};
    for (let o in source) {
      dest[o] = copy(source[o]);
    }
  } else {
    dest = source;
  }
  return dest;
}

function toValue(v: any) {
  try {
    return JSON.parse(v);
  } catch (e) {
    return v;
  }
}

function toString(v: any) {
  try {
    return JSON.stringify(v);
  } catch (e) {
    return v;
  }
}
function immediate(callback: () => void) {
  try {
    return process.nextTick(callback);
  } catch (e) {
    try {
      return setImmediate(callback);
    } catch (e) {
      return setTimeout(callback);
    }
  }
}
export {
  isObject,
  copy,
  isPromise,
  toValue,
  toString,
  runTransaction,
  series,
  paramsForFunction,
  Resolver,
  immediate,
  merge
};
