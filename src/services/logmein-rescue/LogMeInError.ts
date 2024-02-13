import type { LogMeInAPIError } from "./types";

export type InitData = {
  status: number,
  data: LogMeInAPIError,
};

class LogMeInError extends Error {
  status: number;
  data: LogMeInAPIError;

  constructor({ status, data }: InitData) {
    const message = "LogMeIn Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { LogMeInError };
