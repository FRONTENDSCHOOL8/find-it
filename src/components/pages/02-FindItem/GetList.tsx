import { useInfiniteQuery } from '@tanstack/react-query';
import Header from '../../Header/Header';
import loading from '@/assets/loading.svg';
import ItemBox from '../../ItemBox/ItemBox';
import Navigation from '../../Navigation/Navigation';
import { getAllData } from '@/lib/utils/getAPIData';
import { useEffect, useRef, UIEvent, useCallback } from 'react';
import Skeleton from '@/components/ItemBox/Skeleton';
import { AllData } from '@/types/types';

const GetList = () => {
  const scrollContainerRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['getListItems'],
      queryFn: async ({ pageParam }) =>
        await getAllData({ pageNo: pageParam, numOfRows: 10 }),
      initialPageParam: 1,
      getNextPageParam: (allPages) => {
        if (Array.isArray(allPages)) {
          return allPages.length + 1;
        }
      },
    });

  console.log('data');
  console.log(data);

  const handleScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
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
          children="습득물 찾기"
          isShowSearch={true}
          link="/searchfind"
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
        children="습득물 찾기"
        isShowSearch={true}
        link="/searchfind"
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
                  <ItemBox item={item} itemType="get" />
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

export default GetList;
