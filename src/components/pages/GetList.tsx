import Header from '../Header/Header';
import ItemBox from '../ItemBox/ItemBox';
import Navigation from '../Navigation/Navigation';
import { getAllData } from '@/lib/utils/getAPIData';
import { useEffect, useState, useRef, UIEvent } from 'react';
import loading from '@/assets/loading.svg';

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

    const dataArray = Array.isArray(data)
      ? data
      : setItems((prevItems) => [...prevItems, ...dataArray]);
  };

  const fetchMoreItems = async () => {
    setFetching(true);
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchData(nextPage).then(() => setFetching(false));
      return nextPage;
    });
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight && !fetching) {
      fetchMoreItems();
    }
  };

  useEffect(() => {
    fetchData(page);
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [page]);

  return (
    <div className="min-h-667px w-375px bg-gray-200">
      <Header isShowSymbol={true} children="습득물 찾기" isShowSearch={true} />
      <div
        ref={scrollContainerRef}
        className="h-[calc(100vh-73px-80px)] overflow-auto"
      >
        <ul className="mt-18px flex flex-col items-center">
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
