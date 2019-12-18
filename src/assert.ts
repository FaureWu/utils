import * as T from './type';

export function assert(
  validate: boolean | T.AssertValidate,
  message: string,
): void {
  if (
    (typeof validate === 'boolean' && !validate) ||
    (typeof validate === 'function' && !validate())
  ) {
    throw new Error(message);
  }
}

export function isObject(obj: any): boolean {
  return obj !== null && !(obj instanceof Array) && typeof obj === 'object';
}
