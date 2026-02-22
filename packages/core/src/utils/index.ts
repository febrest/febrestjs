export { runTransaction, series } from './transaction';

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
  if (Array.isArray(data[0])) {
    let dest: object[] = [];
    for (const item of data) {
      dest = dest.concat(item);
    }
  } else {
    let dest: Record<string, object> = {};
    for (const item of data) {
      dest = { ...dest, ...item };
    }
  }
};

export const copy = <T>(
  source: T,
  map: Map<unknown, unknown> = new Map()
): T => {
  if (map.has(source)) {
    return map.get(source) as T;
  }

  if (Array.isArray(source)) {
    const dest = [] as unknown as T;
    map.set(source, dest);
    for (let i = 0; i < source.length; i++) {
      (dest as unknown as Array<unknown>)[i] = copy(source[i], map);
    }
    return dest;
  }

  if (isObject(source)) {
    const dest = {} as unknown as T;
    map.set(source, dest);
    for (const key in source) {
      (dest as unknown as Record<string, unknown>)[key] = copy(
        source[key],
        map
      );
    }
    return dest;
  }

  return source;
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
