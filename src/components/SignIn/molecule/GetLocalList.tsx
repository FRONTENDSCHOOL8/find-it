import { useEffect, useState } from 'react';

interface AddressData {
  result: { addr_name: string; cd: number }[];
}
interface 시도코드프롭Props {
  시도코드프롭?: number;
}

const GetLocalList = ({ 시도코드프롭 = '' }: 시도코드프롭Props) => {
  const [localNameList, setLocalNameList] = useState<string[]>([]);
  const VITE_SIDO_API_URL = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=b44b46d4-e2c2-441e-b56f-67c35b665f6a`;
  const VITE_GUNGU_API_URL = `${VITE_SIDO_API_URL}&cd=${시도코드프롭}`;

  useEffect(() => {
    const fetchFunction = async (url: string) => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('fetch 에러');
        }

        const jsonData: AddressData = await response.json();
        const nameList = jsonData.result.map((item) => item.addr_name);
        // const codeList = jsonData.result.map((item) => Number(item.cd));

        setLocalNameList(nameList);
      } catch (error) {
        console.error('에러남: ' + error);
      }
    };

    if (시도코드프롭) {
      fetchFunction(VITE_GUNGU_API_URL);
    } else {
      fetchFunction(VITE_SIDO_API_URL);
    }
  }, []);

  return localNameList;
};

export default GetLocalList;
