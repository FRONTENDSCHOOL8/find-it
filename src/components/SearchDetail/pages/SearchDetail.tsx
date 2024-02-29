import Header from '@/components/Header/Header';
import SearchDate from '../molecule/SearchDate';

const SearchDetail = () => {
  return (
    <div className="flex flex-col items-center">
      <Header isShowPrev={true} empty={true}>
        습득물 상세검색
      </Header>
      <section className="flex flex-col gap-18px">
        <SearchDate>습득 시작일</SearchDate>
        <SearchDate>습득 종료일</SearchDate>
      </section>
    </div>
  );
};

export default SearchDetail;
