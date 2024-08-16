export interface AxiosResByValue<ResponseType> {
  message: string;
  result: boolean;
  value: ResponseType;
}

export interface AxiosResByData<ResponseType> {
  message: string;
  result: boolean;
  data: ResponseType;
}