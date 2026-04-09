export type RequestWithBody<T> = Request<{
  body: T;
}>;

export type RequestWithParams<T> = Request<{
  params: T;
}>;

export type RequestWithQuery<T> = Request<{
  query: T;
}>;
