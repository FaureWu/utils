import * as T from './type';
import { assert, isObject } from './assert';
import emojiRegex from './emojiRegex';

/**
 * strlen(str, option)
 * 获取字符串长度，支持emoji表情，中文字符区分
 *
 * @param str <String>
 * @param option <Object>
 * @param option.emoji <Boolean> 默认值false，当启用此选项时，字符串中的一个emoji表情只会被判定为一个字符长度
 * @param option.dbcs <Boolean> 默认值false，当启用此选项时，中文字符会被判定为两个字符长度
 */
export function strlen(str: string, option: T.StrLenOption = {}): number {
  assert(
    typeof str === 'string',
    `strlen() first param must be an string type, but we get ${typeof str}`,
  );

  if (!isObject(option) || (!option.emoji && !option.dbcs)) return str.length;

  const emojiReg = emojiRegex();
  const emojis = str.match(emojiReg) || [];
  const chars = str.split(emojiReg).join('');

  let count = 0;
  if (option.emoji) count += emojis.length;
  else count += emojis.join('').length;

  if (!option.dbcs) return count + chars.length;

  for (let i = 0; i < chars.length; i++) {
    const charCode = chars.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) {
      count += 1;
    } else {
      count += 2;
    }
  }

  return count;
}
