import { xmlToJson } from '@/lib/utils/xmlToJson';
import { raiseValue } from '@/lib/utils/raiseValue';
import { DetailData, JsonObject } from '@/types/types';

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const parseDetailData = (json: JsonObject): Partial<DetailData> | null => {
  const detailKeys: Array<keyof DetailData> = [
    'id',
    'item_name',
    'image',
    'place',
    'date',
    'item_type',
    'description',
    'storage',
    'contact',
  ];

  const result: Partial<DetailData> = {};

  detailKeys.forEach((key) => {
    const value = json[key];
    if (typeof value === 'string') {
      result[key] = value;
    }
  });

  return Object.keys(result).length > 0 ? result : null;
};

// Partial: 모든 속성을 선택적으로 만듦
const isDetailData = (object: Partial<DetailData>): object is DetailData => {
  return (
    typeof object.id === 'string' &&
    typeof object.item_name === 'string' &&
    typeof object.image === 'string' &&
    typeof object.place === 'string' &&
    typeof object.date === 'string' &&
    typeof object.item_type === 'string' &&
    typeof object.description === 'string' &&
    typeof object.storage === 'string' &&
    typeof object.contact === 'string'
  );
};

export const lostAllData = async (option = {}) => {
  try {
    const params = new URLSearchParams(option);

    const response = await fetch(
      `${import.meta.env.VITE_LOSTITEMS_ALL_API}?serviceKey=${import.meta.env.VITE_PUBLICINFO_API_KEY_INC}&${params.toString()}`
    );

    if (!response.ok) {
      throw new Error('네트워크 응답 없음');
    }

    const data = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    const json = xmlToJson(xml);

    if (typeof json === 'string') {
      throw new Error('json이 문자열입니다.');
    }

    if (
      isJsonObject(json) &&
      isJsonObject(json.response) &&
      isJsonObject(json.response.body) &&
      isJsonObject(json.response.body.items)
    ) {
      const result = raiseValue(json.response?.body.items.item);

      return result;
    }
  } catch (error) {
    console.error('error: ' + error);
  }
};

export const lostSearchData = async (query: string, options = {}) => {
  try {
    const params = new URLSearchParams(options);

    const response = await fetch(
      `${import.meta.env.VITE_LOSTITEMS_SEARCH_API}?serviceKey=${import.meta.env.VITE_PUBLICINFO_API_KEY_INC}&LST_PRDT_NM=${query}&${params.toString()}`
    );

    if (!response.ok) {
      throw new Error('네트워크 응답 없음');
    }

    const data = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    const json = xmlToJson(xml);

    if (typeof json === 'string') {
      throw new Error('json이 문자열입니다.');
    }

    if (
      isJsonObject(json) &&
      isJsonObject(json.response) &&
      isJsonObject(json.response.body) &&
      isJsonObject(json.response.body.items)
    ) {
      const result = raiseValue(json.response?.body.items.item);

      return result;
    }
  } catch (error) {
    console.error('error: ' + error);
  }
};

export const lostSearchId = async (id: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_LOSTITEMS_DETAIL_API}?serviceKey=${import.meta.env.VITE_PUBLICINFO_API_KEY_INC}&ATC_ID=${id}`
    );

    const data = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    const json = xmlToJson(xml);

    if (typeof json === 'string') {
      throw new Error('json이 문자열입니다.');
    }

    if (
      isJsonObject(json) &&
      isJsonObject(json.response) &&
      isJsonObject(json.response.body)
    ) {
      const item = raiseValue(json.response?.body.item);

      if (isJsonObject(item)) {
        const result = {
          id: item.atcId,
          item_name: item.lstPrdtNm,
          image: item.lstFilePathImg,
          place: item.lstPlace,
          date: item.lstYmd,
          item_type: item.lstPlaceSeNm,
          description: item.lstSbjt,
          storage: item.lstLctNm,
          contact: item.tel,
        };

        if (isJsonObject(result)) {
          const jsonObject: JsonObject = result;

          const detailData = parseDetailData(jsonObject);

          if (detailData !== null && isDetailData(detailData)) {
            return detailData;
          }
        }
      }
    }
  } catch (error) {
    console.error('error: ' + error);
  }
};
