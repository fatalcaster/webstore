import { CustomError } from "./custom-error";

export class InternalError extends CustomError {
  statusCode = 500;

  constructor() {
    super("Internal Error");

    Object.setPrototypeOf(this, InternalError.prototype);
  }

  serializeErrors() {
    return [{ message: "Internal Error" }];
  }
}
