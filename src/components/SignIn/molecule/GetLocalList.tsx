import { useEffect, useState } from 'react';

const dataList = {
  id: 'API_0701',
  result: [
    {
      addr_name: '서울특별시',
      cd: '11',
      full_addr: '서울특별시',
      x_coor: '953932',
      y_coor: '1952053',
    },
    {
      addr_name: '경기도',
      cd: '11',
      full_addr: '경기도',
      x_coor: '953932',
      y_coor: '1952053',
    },
  ],
};

const GetLocalList = () => {
  const [주소데이터, 셋주소데이터] = useState({ result: [] });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          'https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=662d80fe-eb38-4cd7-92d3-f0ba613aca4f'
        );

        if (!response.ok) {
          throw new Error('fetch 에러');
        }

        const jsonData = await response.json();

        셋주소데이터(jsonData);
      } catch (error) {
        console.error('에러남: ' + error);
      }
    })();
  }, []);

  const 풀주소 =
    주소데이터.result && 주소데이터.result.map((item) => item.full_addr);
  console.log(풀주소);
  return (
    <ul>
      {풀주소.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default GetLocalList;
