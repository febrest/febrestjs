import { runTransaction, series } from './transaction';

export const isObject = (v: unknown): boolean => {
  return Object.prototype.toString.call(v) === '[object Object]';
};

export const isPromise = (v: object) => {
  if (typeof Promise !== 'undefined' && v instanceof Promise) {
    return true;
  }
  return false;
};

export const merge = (...data: object[]) => {
  let dest: any;
  if (Array.isArray(data[0])) {
    dest = [];
    for (const item of data) {
      dest = dest.concat(item);
    }
  } else {
    dest = {};
    data.forEach((d) => {
      for (let o in d) {
        dest[o] = d[o];
      }
    });
  }
  return dest;
};

export const copy = <T>(source: T): T => {
  let dest: any;
  if (Array.isArray(source)) {
    dest = source.map((v) => {
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
};

export const toValue = <T>(v: string): T => {
  try {
    return JSON.parse(v);
  } catch (e) {
    return v as unknown as T;
  }
};

export const stringify = <T>(v: T): string => {
  try {
    return JSON.stringify(v);
  } catch (e) {
    return String(v);
  }
};

export const immediate = (callback: () => void) => {
  try {
    return setTimeout(callback, 0);
  } catch (e) {
    return callback();
  }
};

export { runTransaction, series };
