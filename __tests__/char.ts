import { strlen } from '../src/char';

describe('strlen test', (): void => {
  test('strlen with default option', (): void => {
    expect(strlen('')).toEqual(0);
    expect(strlen('你好ya')).toEqual(4);
    expect(strlen('你好😊')).toEqual(4);
  });

  test('strlen with set emoji option', (): void => {
    expect(strlen('你好😊', { emoji: true })).toEqual(3);
  });

  test('strlen with set dbcs option', (): void => {
    expect(strlen('你好😊', { dbcs: true })).toEqual(6);
    expect(strlen('你好😊', { dbcs: true, emoji: true })).toEqual(5);
  });
});
