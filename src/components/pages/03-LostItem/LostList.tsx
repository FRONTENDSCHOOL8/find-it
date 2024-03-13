import Header from '../../Header/Header';
import loading from '@/assets/loading.svg';
import ItemBox from '../../ItemBox/ItemBox';
import Navigation from '../../Navigation/Navigation';
// import { JsonArray } from '@/types/types';
// import { lostAllData } from '@/lib/utils/lostAPIData';
import { useEffect, useRef, UIEvent, useCallback } from 'react';
import Skeleton from '@/components/ItemBox/Skeleton';
import { useInfiniteQuery } from '@tanstack/react-query';
import { lostAllData } from '@/lib/utils/lostAPIData';
import { AllData } from '@/types/types';

const LostList = () => {
  // const [items, setItems] = useState([]);
  // const [page, setPage] = useState(1);
  // const [fetching, setFetching] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const scrollContainerRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['lostListItems'],
      queryFn: async ({ pageParam }) =>
        await lostAllData({ pageNo: pageParam, numOfRows: 10 }),
      initialPageParam: 1,
      getNextPageParam: (allPages) => {
        if (Array.isArray(allPages)) {
          return allPages.length + 1;
        }
      },
    });

  // const fetchData = async (pageNo: number) => {
  //   const data = await lostAllData({
  //     pageNo: pageNo,
  //     numOfRows: 10,
  //   });

  //   setItems((prev) => {
  //     return [...prev, ...(data as JsonArray)];
  //   });

  //   setIsLoading(false);
  //   setFetching(false);
  // };

  // const fetchMoreItems = useCallback(async () => {
  //   if (!fetching) {
  //     setFetching(true);
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // }, [fetching]);

  const handleScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight && hasNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
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

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center bg-gray-200">
        <Header
          isShowSymbol={true}
          children="분실물 확인"
          isShowSearch={true}
          link="/searchlost"
        />
        <div className="w-375px">
          <div
            ref={scrollContainerRef}
            className="h-[calc(100vh-66px-80px)] overflow-auto"
          >
            <div className="flex flex-col items-center">
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center bg-gray-200">
      <Header
        isShowSymbol={true}
        children="분실물 확인"
        isShowSearch={true}
        link="/searchlost"
      />
      <div className="w-375px">
        <div
          ref={scrollContainerRef}
          className="h-[calc(100vh-66px-80px)] overflow-auto"
        >
          <ul className="flex flex-col items-center">
            {data.pages.map((page: AllData[]) =>
              page.map((item, index) => (
                <li key={index}>
                  <ItemBox item={item} itemType="lost" />
                </li>
              ))
            )}
          </ul>
          {isFetchingNextPage && (
            <img src={loading} alt="로딩 중" className="mx-auto" />
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default LostList;
