import { LostDetailData, GetDetailData, JsonValue } from '@/types/types';

type Obj = LostDetailData | GetDetailData;

const formatKey = (key: string) => {
  // 접두사를 제거합니다.
  if (key.startsWith('lst')) {
    key = key.slice(3);
  } else if (key.startsWith('fd')) {
    key = key.slice(2);
  }

  // 첫 글자를 소문자로 변환합니다.
  return key.charAt(0).toLowerCase() + key.slice(1);
};

export const removePrefix = (obj: JsonValue) => {
  return Object.keys(obj).reduce((newObj, key) => {
    const formattedKey = formatKey(key);
    newObj[formattedKey] = obj[key];
    return newObj;
  }, {});
};
