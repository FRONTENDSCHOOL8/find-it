import { xmlToJson } from '@/lib/utils/xmlToJson';
import { raiseValue } from '@/lib/utils/raiseValue';
import { LostDetailData, JsonObject } from '@/types/types';
import { removePrefix } from './removePrefix';

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const parseDetailData = (json: JsonObject): Partial<LostDetailData> | null => {
  const detailKeys: Array<keyof LostDetailData> = [
    'atcId',
    'lstFilePathImg',
    'uniq',
    'lstLctNm',
    'lstPlace',
    'lstPlaceSeNm',
    'lstPrdtNm',
    'lstSbjt',
    'lstSteNm',
    'lstYmd',
    'orgId',
    'orgNm',
    'prdtClNm',
    'tel',
  ];

  const result: Partial<LostDetailData> = {};

  detailKeys.forEach((key) => {
    const value = json[key];
    if (typeof value === 'string') {
      result[key] = value;
    }
  });

  return Object.keys(result).length > 0 ? result : null;
};

// Partial: 모든 속성을 선택적으로 만듦
const isDetailData = (
  object: Partial<LostDetailData>
): object is LostDetailData => {
  return (
    typeof object.atcId === 'string' &&
    typeof object.lstFilePathImg === 'string' &&
    typeof object.uniq === 'string' &&
    typeof object.lstLctNm === 'string' &&
    typeof object.lstPlace === 'string' &&
    typeof object.lstPlaceSeNm === 'string' &&
    typeof object.lstPrdtNm === 'string' &&
    typeof object.lstSbjt === 'string' &&
    typeof object.lstSteNm === 'string' &&
    typeof object.lstYmd === 'string' &&
    typeof object.orgId === 'string' &&
    typeof object.orgNm === 'string' &&
    typeof object.prdtClNm === 'string' &&
    typeof object.tel === 'string'
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
