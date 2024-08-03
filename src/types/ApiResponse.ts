import { AxiosError } from "axios";

interface HttpSuccessResponse<T> {
  readonly data: T;
  readonly message: string;
  readonly success: boolean;
}

interface HttpErrorResponse extends AxiosError {
  readonly error: any;
  readonly message: string;
  readonly success: boolean;
}

export type { HttpErrorResponse, HttpSuccessResponse };
