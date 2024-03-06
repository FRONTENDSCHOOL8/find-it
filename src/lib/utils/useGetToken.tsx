import { useEffect, useState } from 'react';

// 행정동 API 토큰 발급 & 유효시간(4시간) 업데이트

const useGetToken = () => {
  const MAX_AUTH_ATTEMPTS = 200;
  const TOKEN_REFRESH_INTERVAL = 3.6e6; //3시간마다 재발급
  const URL = `${import.meta.env.VITE_AUTH_API_URL}?consumer_key=${import.meta.env.VITE_CONSUMERKEY}&consumer_secret=${import.meta.env.VITE_CONSUMERSECRET}`;
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  useEffect(() => {
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

    getAccessToken();
    const interval = setInterval(getAccessToken, TOKEN_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [attemptCount, URL]);
  return accessToken;
};

export default useGetToken;
