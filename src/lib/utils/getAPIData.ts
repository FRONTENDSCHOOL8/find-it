import { xmlToJson } from '@/lib/utils/xmlToJson';
import { raiseValue } from '@/lib/utils/raiseValue';
import { JsonObject, DetailData } from '@/types/types';
import { removePrefix } from './removePrefix';

const isJsonObject = (value: unknown): value is JsonObject => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const parseDetailData = (json: JsonObject): Partial<DetailData> | null => {
  const detailKeys: Array<keyof DetailData> = [
    'atcId',
    'csteSteNm',
    'depPlace',
    'filePathImg',
    'hor',
    'place',
    'prdtNm',
    'sn',
    'ymd',
    'keepOrgnSeNm',
    'orgId',
    'orgNm',
    'prdtClNm',
    'tel',
    'uniq',
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
    typeof object.atcId === 'string' &&
    typeof object.csteSteNm === 'string' &&
    typeof object.depPlace === 'string' &&
    typeof object.filePathImg === 'string' &&
    typeof object.hor === 'string' &&
    typeof object.place === 'string' &&
    typeof object.prdtNm === 'string' &&
    typeof object.sn === 'string' &&
    typeof object.ymd === 'string' &&
    typeof object.keepOrgnSeNm === 'string' &&
    typeof object.orgId === 'string' &&
    typeof object.orgNm === 'string' &&
    typeof object.prdtClNm === 'string' &&
    typeof object.tel === 'string' &&
    typeof object.uniq === 'string'
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
      throw new Error('json is string');
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
      throw new Error('json is string');
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
      throw new Error('json is string');
    }

    if (
      isJsonObject(json) &&
      isJsonObject(json.response) &&
      isJsonObject(json.response.body)
    ) {
      const item = raiseValue(json.response?.body.item);
      const result = removePrefix(item);

      if (isJsonObject(result)) {
        const jsonObject: JsonObject = result;

        const detailData = parseDetailData(jsonObject);

        if (detailData !== null && isDetailData(detailData)) {
          return detailData;
        }
      }
    }
  } catch (error) {
    console.error('error: ' + error);
  }
};
