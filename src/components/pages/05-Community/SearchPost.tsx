import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getData } from '@/lib/utils/crud';
import { getTimeDiff } from '@/lib/utils/getTimeDiff';
import Header from '@/components/Header/Header';
import Horizon from '@/components/common/atom/Horizon';
import Navigation from '@/components/Navigation/Navigation';

const SearchPost = () => {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showNoResult, setShowNoResult] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // 인풋 값 잡기
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const thisValue = e.target.value;
    setInputValue(thisValue);
  };

  // pb 와 비교 검색
  const submitInput = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (inputValue.trim() !== '') {
        const data = await getData('community', {
          filter: `content ~ "${inputValue}"`,
        });
        setData(data);
        setInputValue('');
        setShowNoResult(data.length === 0);
      } else {
        // 검색어가 빈 문자열 또는 공백 문자열인 경우에 대한 처리
        setData([]);
        setShowNoResult(false);
      }
    } catch (error) {
      console.error('게시물 검색 pb 통신 에러 ', error);
    }
  };
  const SearchResult = (
    <>
      {data.map((item, index) => (
        <div key={item.id} className="w-full">
          <Link to={`/postdetail/${item.id}`}>
            <section className="relative mx-auto my-0 h-160px w-335px px-10px pt-10px">
              {getTimeDiff({ createdAt: data[index].created })}
              <h1 className="truncate pt-8px text-16px text-black">
                {item.title}
              </h1>
              <span className="w-full	 whitespace-normal pt-8px text-12px text-gray-700">
                {(item.content.length > 64 &&
                  item.content.slice(0, 64) + '...') ||
                  item.content}
              </span>
              <span className="absolute bottom-14px block text-12px text-gray-450">
                #{item.tag}
              </span>
            </section>
          </Link>
          <div className="mx-auto my-0 h-10px w-full border-t border-t-gray-300 bg-gray-200" />
        </div>
      ))}
    </>
  );

  const NoResult = (
    <div className="pt-20px text-center">검색 결과가 없습니다.</div>
  );
  return (
    <div className="relative flex h-screen w-full flex-col items-center">
      <Header isShowPrev={true} children="게시물 검색" isShowSearch={true} />
      <Horizon lineBold="bold" lineWidth="long" />

      <form
        className="absolute ml-40px flex h-66px items-center"
        onSubmit={submitInput}
      >
        <input
          ref={inputRef}
          type="search"
          value={inputValue}
          onChange={inputChange}
          className="w-280px appearance-none	rounded-full px-20px py-8px text-16px outline-none	"
          style={{ border: '1px solid #bcbcbc' }}
          placeholder="검색어 입력 후 Enter"
        />
      </form>
      <div className="w-375px">
        <div className="h-[calc(100vh-66px-80px)] overflow-auto">
          {data.length > 0 ? SearchResult : showNoResult && NoResult}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default SearchPost;
