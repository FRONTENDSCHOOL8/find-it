interface Json {
  [key: string]: Json | string | Json[] | object;
}

// XML을 JSON으로 변환하는 함수
export const xmlToJson = (xml: Node): Json | string => {
  const obj: Json = {};

  if (xml.nodeType === 1 && xml instanceof Element) {
    // 요소 노드
    if (xml.hasAttributes()) {
      obj['@attributes'] = Array.from(xml.attributes).reduce(
        (acc: Json, attr: Attr) => {
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
    Array.from(xml.childNodes).forEach((item: ChildNode) => {
      const nodeName: string = item.nodeName;
      const value: Json | string = xmlToJson(item);

      if (obj[nodeName] === undefined) {
        obj[nodeName] = value;
      } else {
        if (!Array.isArray(obj[nodeName])) {
          obj[nodeName] = [obj[nodeName] as Json];
        }
        (obj[nodeName] as Json[]).push(value as Json);
      }
    });
  }

  return obj;
};
