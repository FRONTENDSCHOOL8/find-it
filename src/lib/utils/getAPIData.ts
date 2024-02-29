import { xmlToJson } from '@/lib/utils/xmlToJson';

const defaultOptions = {
  method: 'GET',
};

export const getAPIData = async (
  url: string,
  query = {},
  options = defaultOptions
) => {
  try {
    const params = new URLSearchParams(query);

    const response = await fetch(
      `${url}?serviceKey=${import.meta.env.VITE_PUBLICINFO_API_KEY_INC}&${params.toString()}`,
      options
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
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
