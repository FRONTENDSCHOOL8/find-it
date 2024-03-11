import { xmlToJson } from '@/lib/utils/xmlToJson';
import { raiseValue } from '@/lib/utils/raiseValue';
import { JsonObject } from '@/types/types';

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

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

      const pageNo = json.response;
      console.log(pageNo);

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

export const getSearchId = async (id: string) => {
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
      const result = raiseValue(json.response?.body.item);

      return result;
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
      throw new Error('json is string');
    }

    if (
      isJsonObject(json) &&
      isJsonObject(json.response) &&
      isJsonObject(json.response.body) &&
      isJsonObject(json.response.body.items)
    ) {
      const result = raiseValue(json.response);

      // const pageNo = json.response;
      // console.log(pageNo);

      return result;
    }
  } catch (error) {
    console.error('error: ' + error);
  }
};
