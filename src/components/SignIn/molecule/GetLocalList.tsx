import { useEffect, useState } from 'react';

interface AddressData {
  result: { addr_name: string; cd: number }[];
}

const CONSUMERKEY = '7d560967125d42e48900';
const CONSUMERSECRET = '84ea54c3e889409a9841';
const VITE_AUTH_API_URL =
  'https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json';
const VITE_LOCAL_API_URL =
  'https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json';
const localCode = 11;
const getAccessToken = async () => {
  const URL = `${VITE_AUTH_API_URL}?consumer_key=${CONSUMERKEY}&consumer_secret=${CONSUMERSECRET}`;
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error('fetch 에러');
    }
    const jsonData = await response.json();
    const token = jsonData.result.accessToken;
    return token;
  } catch (error) {
    console.error('에러남: ' + error);
    return null;
  }
};

const GetLocalList = () => {
  const [localNameList, setLocalNameList] = useState<string[]>([]);
  const [mytoken, setMytoken] = useState<string | null>(null); // abc 변수를 useState로 선언

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      if (token) {
        setMytoken(token);
      }
    })();
  }, []);

  useEffect(() => {
    if (mytoken) {
      (async () => {
        try {
          const SIDOURL = `${VITE_LOCAL_API_URL}?accessToken=${mytoken}`;
          const GUNGUURL = `${VITE_LOCAL_API_URL}?accessToken=${mytoken}&cd=${localCode}`;
          const response = await fetch(GUNGUURL);

          if (!response.ok) {
            throw new Error('fetch 에러');
          }
          const jsonData: AddressData = await response.json();
          const nameList = jsonData.result.map((item) => item.addr_name);
          const codeList = jsonData.result.map((item) => Number(item.cd));
          setLocalNameList(nameList);
        } catch (error) {
          console.error('에러남: ' + error);
        }
      })();
    }
  }, [mytoken]);

  return localNameList;
};

export default GetLocalList;
