import Header from '../Header/Header';
// import ItemBox from '../ItemBox/ItemBox';

const SearchResult = () => {
  return (
    <div className="flex h-667px min-w-375px max-w-400px flex-col items-center overflow-y-auto bg-gray-200">
      <Header isShowPrev={true} empty={true}>
        검색결과
      </Header>
      <div className="flex flex-col items-center justify-between">
        <div>
          <a href="/" className="block">
            <div className="mb-3 flex h-140px w-335px justify-between rounded-[20px] bg-white transition-all duration-300 hover:cursor-pointer hover:shadow-lg">
              <div className="flex flex-col items-start py-18px pl-20px">
                <h1 className="pb-2 text-20px font-medium leading-[1.3] tracking-tighter">
                  물품명
                </h1>
                <span className="rounded-full bg-primary px-3 py-1 text-10px font-medium leading-[1.3] tracking-tighter text-white">
                  습득장소
                </span>

                <div className="mt-13px flex flex-col gap-1">
                  <span className="text-12px font-medium leading-[1.3] tracking-tighter text-gray-500">
                    습득한 날
                  </span>
                  <span className="text-12px font-medium leading-[1.3] tracking-tighter">
                    2024년 2월 26일
                  </span>
                </div>
              </div>

              <div className="p-10px">
                <img src="/" alt="등록된 물품 사진 없음" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
