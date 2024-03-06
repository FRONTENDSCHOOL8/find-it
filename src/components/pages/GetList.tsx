import Header from '../Header/Header';
import ItemBox from '../ItemBox/ItemBox';
import Navigation from '../Navigation/Navigation';
import { getAllData } from '@/lib/utils/getAPIData';
import { useEffect, useState, useRef, useCallback } from 'react';

const GetList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllData({
        pageNo: page,
        numOfRows: 6,
      });
      setItems((prevItems) => [...prevItems, ...data.body.items.item]);
    };

    fetchData();
  }, [page]);

  const observer = useRef();
  const lastItemElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          const data = await getAllData({
            pageNo: page + 1,
            numOfRows: 6,
          });
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [page] // 수정된 부분: page를 의존성 배열에 추가
  );

  return (
    <div className="min-h-667px w-375px bg-gray-200">
      <Header isShowSymbol={true} children="습득물 찾기" isShowSearch={true} />
      <div className="h-[calc(100vh-73px-80px)] overflow-auto">
        <ul className="mt-18px flex flex-col items-center">
          {items.map((item, index) => (
            <li
              key={index}
              ref={index === items.length - 1 ? lastItemElementRef : null}
            >
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
