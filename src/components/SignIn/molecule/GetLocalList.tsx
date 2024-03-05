import { useEffect, useState } from 'react';

// 토큰 발급 & 유효시간(4시간) 업데이트
const useGetAccessToken = () => {
  const MAX_AUTH_ATTEMPTS = 200;
  const TOKEN_REFRESH_INTERVAL = 3.6e6; //3시간마다 재발급
  const URL = `${import.meta.env.VITE_AUTH_API_URL}?consumer_key=${import.meta.env.VITE_CONSUMERKEY}&consumer_secret=${import.meta.env.VITE_CONSUMERSECRET}`;
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState<number>(0);

  const getAccessToken = async () => {
    if (attemptCount >= MAX_AUTH_ATTEMPTS) {
      throw new Error('API 인증 시도 횟수를 초과했습니다.');
    }
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
/* -------------------------------------------------------------------------- */
// 타입 정의
interface AddressData {
  result: { addr_name: string; cd: number }[];
}
/* -------------------------------------------------------------------------- */
// 시도 리스트
const useSidoList = (accessToken: string) => {
  const [localList, setLocalList] = useState<string[]>([]);

  useEffect(() => {
    const getLocalList = async () => {
      if (!accessToken) return;

      try {
        const SIDOURL = `${import.meta.env.VITE_LOCAL_API_URL}?accessToken=${accessToken}`;
        const response = await fetch(SIDOURL);

        if (!response.ok) {
          throw new Error('시/도 목록을 불러오는데 실패했습니다.');
        }
        // 객체의 배열 데이터 가져옴 -> 해당 이름의 cd를 가져와서 ->  cd를 넣어야 군구 뽑기 가능
        const jsonData: AddressData = await response.json();
        const items = jsonData.result;
        // 가져온 데이터에서 이름 뿌리기
        const nameList = items.map((item) => item.addr_name);
        // const codeList = items.map((item) => Number(item.cd));
        setLocalList(nameList);
      } catch (error) {
        console.error('에러남: ' + error);
      }
    };
    getLocalList();
  }, [accessToken]);
  return localList;
};
export const GetSidoList = () => {
  const accessToken = useGetAccessToken();
  const localList = useSidoList(accessToken || '');
  return localList;
};

/* -------------------------------------------------------------------------- */
//군구 리스트
//위에서 가져온 코드 필요함
const LOCAL_CODE = 11;
const useGunguList = (accessToken: string) => {
  const [localList, setLocalList] = useState<string[]>([]);

  useEffect(() => {
    const getLocalList = async () => {
      if (!accessToken) return;

      try {
        const GUNGUURL = `${import.meta.env.VITE_LOCAL_API_URL}?accessToken=${accessToken}&cd=${LOCAL_CODE}`;
        const response = await fetch(GUNGUURL);

        if (!response.ok) {
          throw new Error('군/구 목록을 불러오는데 실패했습니다.');
        }
        const jsonData: AddressData = await response.json();
        const items = jsonData.result;
        const nameList = items.map((item) => item.addr_name);
        setLocalList(nameList);
      } catch (error) {
        console.error('에러남: ' + error);
      }
    };
    getLocalList();
  }, [accessToken]);
  return localList;
};
export const GetGunguList = () => {
  const accessToken = useGetAccessToken();
  const localList = useGunguList(accessToken || '');
  return localList;
};
