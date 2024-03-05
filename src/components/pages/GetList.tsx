import Header from '../Header/Header';
import ItemBox from '../ItemBox/ItemBox';
import Navigation from '../Navigation/Navigation';
import { getAllData } from '@/lib/utils/getAPIData';
import { useEffect, useState } from 'react';

const GetList = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getAllData({
        pageNo: 5,
        numOfRows: 6,
      });
      setItems(data.body.items.item);

      console.log(data.body.items.item);
    })();
  }, []);

  return (
    <div className="min-h-667px w-375px bg-gray-200">
      <Header isShowSymbol={true} children="습득물 찾기" isShowSearch={true} />
      <div className="h-[calc(100vh-73px-80px)] overflow-auto">
        <ul className="mt-18px flex flex-col items-center">
          {items.map((item, index) => (
            <li key={index}>
              <ItemBox item={item} itemType="get" />
            </li>
          ))}
        </ul>
      </div>
      <Navigation />
    </div>
  );
};

export default GetList;
