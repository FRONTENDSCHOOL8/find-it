import Header from '../Header/Header';
import ItemBox from '../ItemBox/ItemBox';

const SearchResult = () => {
  return (
    <div className="flex h-667px min-w-375px max-w-400px flex-col items-center gap-18px overflow-y-auto bg-gray-200">
      <Header isShowPrev={true} empty={true}>
        검색결과
      </Header>
      <div className="flex flex-col items-center justify-between">
        <ItemBox itemType="lost" />
        <ItemBox itemType="lost" />
        <ItemBox itemType="lost" />
        <ItemBox itemType="lost" />
        <ItemBox itemType="lost" />
        <ItemBox itemType="lost" />
        <ItemBox itemType="lost" />
        <ItemBox itemType="lost" />
      </div>
    </div>
  );
};

export default SearchResult;
