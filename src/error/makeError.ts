import BaseError from "./BaseError";
function makeError(message: string, type?: string) {
  throw new BaseError(message, type);
}

export default makeError;
