import { xmlToJson } from '@/lib/utils/xmlToJson';
import { raiseValue } from '@/lib/utils/raiseValue';
import { JsonObject, DetailData } from '@/types/types';

const isJsonObject = (value: unknown): value is JsonObject => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

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

export const getAllData = async (options = {}) => {
  try {
    const params = new URLSearchParams(options);

    const response = await fetch(
      `${import.meta.env.VITE_GETITEMS_ALL_API}?serviceKey=${import.meta.env.VITE_PUBLICINFO_API_KEY_INC}&${params.toString()}`
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
      const items = json.response.body.items.item;

      if (!Array.isArray(items)) {
        throw new Error('items의 타입이 배열이 아닙니다.');
      }

      const result = raiseValue(items);

      return result;
    }
  } catch (error) {
    console.error('error: ' + error);
  }
};

export const getSearchData = async (query: string, options = {}) => {
  try {
    const params = new URLSearchParams(options);

    const response = await fetch(
      `${import.meta.env.VITE_GETITEMS_SEARCH_API}?serviceKey=${import.meta.env.VITE_PUBLICINFO_API_KEY_INC}&PRDT_NM=${query}&${params.toString()}`
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

export const getSearchId = async (id: string): Promise<DetailData | null> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GETITEMS_DETAIL_API}?serviceKey=${import.meta.env.VITE_PUBLICINFO_API_KEY_INC}&ATC_ID=${id}&FD_SN=1`
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
      isJsonObject(json.response.body)
    ) {
      const item = raiseValue(json.response?.body.item);

      if (isJsonObject(item)) {
        const result = {
          id: item.atcId,
          item_name: item.fdPrdtNm,
          image: item.fdFilePathImg,
          place: item.fdPlace,
          date: item.fdYmd,
          item_type: item.prdtClNm,
          description: item.fndKeepOrgnSeNm,
          contact: item.tel,
          storage: item.depPlace,
        };

        if (isJsonObject(result)) {
          const jsonObject: JsonObject = result;

          const detailData = parseDetailData(jsonObject);

          if (detailData !== null && isDetailData(detailData)) {
            return detailData;
          }

          return null;
        }
      }
    }
  } catch (error) {
    console.error('error: ' + error);
  }
};

export const getSearchFindData = async (query = {}) => {
  try {
    const params = new URLSearchParams(query);

    const response = await fetch(
      `${import.meta.env.VITE_GET_FIND_DATA_CATEGORY_API_URL}?serviceKey=${import.meta.env.VITE_GET_DATA_API_KEY_ENC}&${params.toString()}`
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

export const getSearchLostData = async (query = {}) => {
  try {
    const params = new URLSearchParams(query);

    const response = await fetch(
      `${import.meta.env.VITE_GET_LOST_DATA_CATEGORY_API_URL}?serviceKey=${import.meta.env.VITE_GET_DATA_API_KEY_ENC}&${params.toString()}`
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
