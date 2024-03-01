import { useCallback, useEffect, useState } from 'react';

interface AddressData {
  result: { addr_name: string; cd: number }[];
}
const CONSUMERKEY = '7d560967125d42e48900';
const CONSUMERSECRET = '84ea54c3e889409a9841';
const VITE_AUTH_API_URL =
  'https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json';
const VITE_LOCAL_API_URL =
  'https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json';
const LOCAL_CODE = 11;
const MAX_AUTH_ATTEMPTS = 200;
const TOKEN_REFRESH_INTERVAL = 3.6e6; //3시간마다 재발급

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState<number>(0);

  const getAccessToken = async () => {
    if (attemptCount >= MAX_AUTH_ATTEMPTS) {
      throw new Error('API 인증 시도 횟수를 초과했습니다.');
    }
    const URL = `${VITE_AUTH_API_URL}?consumer_key=${CONSUMERKEY}&consumer_secret=${CONSUMERSECRET}`;
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('API 인증에 실패했습니다.');
      }
      const jsonData = await response.json();
      setAccessToken(jsonData.result.accessToken);
      setAttemptCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('에러남: ' + error);
    }
  };

  useEffect(() => {
    getAccessToken();
    const interval = setInterval(getAccessToken, TOKEN_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);
  return accessToken;
};

const useLocalList = (accessToken) => {
  const [localList, setLocalList] = useState<string[]>([]);

  useEffect(() => {
    const fetchLocalList = async () => {
      if (!accessToken) return;

      try {
        const SIDOURL = `${VITE_LOCAL_API_URL}?accessToken=${accessToken}`;
        // const GUNGUURL = `${VITE_LOCAL_API_URL}?accessToken=${accessToken}&cd=${LOCAL_CODE}`;
        const response = await fetch(SIDOURL);

        if (!response.ok) {
          throw new Error('목록을 불러오는데 실패했습니다.');
        }
        const jsonData: AddressData = await response.json();
        const items = jsonData.result;
        const nameList = items.map((item) => item.addr_name);
        // const codeList = items.map((item) => Number(item.cd));
        setLocalList(nameList);
      } catch (error) {
        console.error('에러남: ' + error);
      }
    };
    fetchLocalList();
  }, [accessToken]);
  return localList;
};

const GetLocalList = () => {
  const accessToken = useAccessToken();
  const localList = useLocalList(accessToken);
  console.log(accessToken);
  return localList;
};

export default GetLocalList;
