export interface IErrorMessageResponse {
  errorsMessages: IErrorMessage[];
}

export interface IErrorMessage {
  message: string;
  field: string;
}
