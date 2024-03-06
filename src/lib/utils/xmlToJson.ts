import { JsonObject, JsonValue } from '@/types/types';

// XML을 JSON으로 변환하는 함수
export const xmlToJson = (xml: Node): JsonObject | string => {
  const obj: JsonValue = {};

  if (xml.nodeType === 1 && xml instanceof Element) {
    // 요소 노드
    if (xml.hasAttributes()) {
      obj['@attributes'] = Array.from(xml.attributes).reduce<JsonObject>(
        (acc, attr) => {
          acc[attr.nodeName] = attr.nodeValue || '';
          return acc;
        },
        {}
      );
    }
  } else if (xml.nodeType === 3) {
    // 텍스트 노드
    return xml.nodeValue || '';
  }

  if (xml.hasChildNodes()) {
    Array.from(xml.childNodes).forEach((item) => {
      const nodeName: string = item.nodeName;
      const value: JsonValue | string = xmlToJson(item);

      if (obj[nodeName] === undefined) {
        obj[nodeName] = value;
      } else {
        if (!Array.isArray(obj[nodeName])) {
          obj[nodeName] = [obj[nodeName] as JsonValue];
        }
        (obj[nodeName] as JsonValue[]).push(value as JsonValue);
      }
    });
  }

  return obj;
};
