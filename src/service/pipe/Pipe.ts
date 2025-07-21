export interface Pipe<T> {
  execute(context: T): Promise<T>;
}