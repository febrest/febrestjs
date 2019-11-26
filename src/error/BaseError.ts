class BaseError extends Error {
  type: string = "base";
  constructor(message: string, type?: string) {
    super(message);
    this.type = type || "base";
  }
  toString() {
    return this.message;
  }
}

export default BaseError;
