import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getData } from '@/lib/utils/crud';
import { getTimeDiff } from '@/lib/utils/getTimeDiff';
import Header from '@/components/Header/Header';
import Horizon from '@/components/common/atom/Horizon';

const SearchPost = () => {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
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
      const data = await getData('community', {
        filter: `content ~ "${inputValue}"`,
      });
      setData(data);
      setInputValue('');
      // if (data.length === 0) {
      //   console.log('검색결과');
      // }
      // console.log('검색결과', data);
    } catch (error) {
      console.error('게시물 검색 pb 통신 에러 ', error);
    }
  };
  const SearchResult = (
    <>
      {data.map((item, index) => (
        <div key={item.id} className="w-screen">
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
          <div className="h-10px w-full border-t border-t-gray-300 bg-gray-200" />
        </div>
      ))}
    </>
  );

  // const NoResult = <div className="text-center">검색 결과가 없습니다.</div>;
  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center">
        <Header isShowPrev={true} children="게시물 검색" isShowSearch={true} />
        <Horizon lineBold="thin" lineWidth="long" />

        <form
          className="absolute ml-40px flex h-66px items-center"
          onSubmit={submitInput}
        >
          <input
            type="search"
            value={inputValue}
            onChange={inputChange}
            className="w-280px appearance-none rounded-full px-20px py-8px text-16px	"
            style={{ border: '1px solid #bcbcbc' }}
            placeholder="검색어를 입력하세요."
          />
        </form>
      </div>
      {SearchResult}
    </>
  );
};

export default SearchPost;
