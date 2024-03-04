import { xmlToJson } from '@/lib/utils/xmlToJson';

export const getAllData = async (query = {}) => {
  try {
    const params = new URLSearchParams(query);

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

    return json.response;
  } catch (error) {
    console.error('error: ' + error);
  }
};

export const getSearchData = async (query: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GETITEMS_SEARCH_API}?serviceKey=${import.meta.env.VITE_PUBLICINFO_API_KEY_INC}&PRDT_NM=${query}`
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

    return json.response;
  } catch (error) {
    console.error('error: ' + error);
  }
};
