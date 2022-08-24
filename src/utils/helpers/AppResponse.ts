import { StatusCodes } from "http-status-codes";

class AppResponse {
  public readonly message;
  public readonly statusCode;

  public readonly hasError: boolean;
  public readonly data;
  constructor(message: string, statusCode: number, data?: unknown) {
    this.message = message;
    this.statusCode = statusCode;
    if (statusCode === StatusCodes.OK || statusCode === StatusCodes.CREATED) {
      this.hasError = false;
    } else {
      this.hasError = true;
    }

    if (statusCode === StatusCodes.OK || statusCode === StatusCodes.CREATED) {
      this.data = data;
    } else {
      this.data = null;
    }
  }
}

export default AppResponse;
