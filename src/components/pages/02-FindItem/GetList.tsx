import Header from '../../Header/Header';
import ItemBox from '../../ItemBox/ItemBox';
import Navigation from '../../Navigation/Navigation';
import { getAllData } from '@/lib/utils/getAPIData';
import { useEffect, useState, useRef, UIEvent, useCallback } from 'react';
import loading from '@/assets/loading.svg';
import { JsonArray } from '@/types/types';

const GetList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const scrollContainerRef = useRef(null);

  const fetchData = async (pageNo: number) => {
    const data = await getAllData({
      pageNo: pageNo,
      numOfRows: 6,
    });

    console.log(data);

    setItems((prev) => {
      return [...prev, ...(data as JsonArray)];
    });

    setFetching(false);
  };

  const fetchMoreItems = useCallback(async () => {
    if (!fetching) {
      setFetching(true);
      setPage((prevPage) => prevPage + 1);
    }
  }, [fetching]);

  const handleScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight && !fetching) {
        fetchMoreItems();
      }
    },
    [fetching, fetchMoreItems]
  );

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div className="min-h-667px w-375px bg-gray-200">
      <Header isShowSymbol={true} children="습득물 찾기" isShowSearch={true} />
      <div
        ref={scrollContainerRef}
        className="h-[calc(100vh-73px-80px)] overflow-auto"
      >
        <ul className="flex flex-col items-center">
          {items.map((item, index) => (
            <li key={index}>
              <ItemBox item={item} itemType="get" />
            </li>
          ))}
        </ul>
        {fetching && <img src={loading} alt="로딩 중" className="mx-auto" />}
      </div>
      <Navigation />
    </div>
  );
};

export default GetList;
