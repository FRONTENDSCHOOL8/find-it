import React, { useEffect } from 'react';
import { getAPIData } from '@/util/getAPIData';

interface DetailType {
  item_name: string;
  date: string;
  place: string;
  content: string;
  item_image: string;
  storage: string;
  phone: string;
  mgmt_num: number;
  item_type_A: string;
  item_type_B: string;
}

export interface DetailProps {
  children: React.ReactNode;
}

const data: DetailType = {
  item_name: '종이가방',
  date: '2021-10-10',
  place: '피시방',
  content: '종이로 만든 가방입니다. 피시방에서 주움.',
  item_image: '',
  storage: '서울시 강남구 친절한 파출소',
  phone: '010-1234-5678',
  mgmt_num: 123456,
  item_type_A: '가방',
  item_type_B: '종이',
};

const Detail: React.FC<DetailProps> = ({ children }) => {
  const isEmpty = (value: string) => value !== '';

  useEffect(() => {
    (async () => {
      const data = await getAPIData('/apiGet', {});

      console.log(data);
    })();
  }, []);

  return (
    <>
      <div className="h-250px w-375px bg-slate-500">
        {isEmpty(data.item_image) && (
          <img src={data.item_image} alt="item_image" />
        )}
      </div>
      <ul>
        <li>
          <dl>
            <dt className="sr-only">물품명</dt>
            <dd>{data.item_name}</dd>
          </dl>
        </li>
        <li>
          <dl className="flex gap-10px">
            <dt className="">습득장소</dt>
            <dd>{data.place}</dd>
          </dl>
        </li>
      </ul>
    </>
  );
};

export default Detail;
