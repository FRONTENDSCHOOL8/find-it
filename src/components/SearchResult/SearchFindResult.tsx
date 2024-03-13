import Header from '../Header/Header';
import useSearchStore from '@/store/search/searchStore';
import { useEffect, useState, useRef, UIEvent, useCallback } from 'react';
import loading from '@/assets/loading.svg';
import { JsonArray } from '@/types/types';
import ItemBox from '@/components/ItemBox/ItemBox';
import { getSearchFindData } from '@/lib/utils/getAPIData';
import getFormattedDate from '@/lib/utils/getFormattedDate';
import Navigation from '../Navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import Skeleton from './../ItemBox/Skeleton';

const SearchFindResult = () => {
  const {
    selectStartDate,
    selectEndDate,
    selectedMainCategoryValue,
    selectedSubCategoryValue,
    selectedAreaValue,
  } = useSearchStore();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const scrollContainerRef = useRef(null);

  const navigate = useNavigate();

  const fetchData = async (pageNo: number) => {
    setFetching(true);
    const data = await getSearchFindData({
      PRDT_CL_CD_01: selectedMainCategoryValue,
      PRDT_CL_CD_02: selectedSubCategoryValue,
      N_FD_LCT_CD: selectedAreaValue,
      START_YMD:
        selectStartDate !== '날짜를 선택하세요.'
          ? getFormattedDate(selectStartDate)
          : '',
      END_YMD:
        selectEndDate !== '날짜를 선택하세요.'
          ? getFormattedDate(selectEndDate)
          : '',
      pageNo: pageNo,
      numOfRows: 10,
    });

    if (typeof data === 'undefined') {
      setFetching(false);
      return setItems(null);
    }

    setItems((prev) => {
      return [...prev, ...(data as JsonArray)];
    });

    setIsLoading(false);
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
    if (selectStartDate === '날짜를 선택하세요.') {
      navigate('/searchfind');
    } else {
      fetchData(page);
    }
  }, [page, navigate, selectStartDate]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center bg-gray-200">
        <Header isShowPrev={true} empty={true}>
          검색결과
        </Header>
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
      <Header isShowPrev={true} empty={true}>
        검색결과
      </Header>
      <div className="w-375px">
        <div
          ref={scrollContainerRef}
          className="h-[calc(100vh-66px-80px)] overflow-auto"
        >
          {items === null ? (
            <span className="text-center">검색 결과가 없습니다.</span>
          ) : (
            <ul className="flex flex-col items-center">
              {(items || []).map((item, index) => (
                <li key={index}>
                  <ItemBox item={item} itemType="get" />
                </li>
              ))}
            </ul>
          )}
          {fetching && <img src={loading} alt="로딩 중" className="mx-auto" />}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default SearchFindResult;
