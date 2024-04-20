export interface IUsecase<T = unknown> {
    exec: (input: T) => Promise<T>;
  }