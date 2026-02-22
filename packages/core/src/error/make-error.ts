import BaseError from './base-error';
function makeError(message: string, type?: string) {
  throw new BaseError(message, type);
}

export default makeError;
