import Header from '@/components/Header/Header';
import SearchDate from '../molecule/SearchDate';
import Horizon from '@/components/common/atom/Horizon';
import SearchParagraph from '../atom/SearchParagraph';
import { ButtonVariable } from '@/components/common/molecule/ButtonVariable';
import Shortcut from '@/components/Shortcut/Shortcut';
import icon_next from '@/assets/icons/icon_next.svg';
import { useState } from 'react';
import select from '@/assets/search/select.svg';

const SearchDetail = () => {
  const [findItemName, setFindItemName] = useState('');
  const [lostPersonName, setLostPersonName] = useState('');

  const sectionStyle = 'flex flex-col gap-20px justify-center pt-20px';
  const inputGroupStyle = 'flex justify-between items-center gap-25px';
  const inputStyle =
    'focus:border focus:outline-none focus:border-solid focus:border-primary w-246px rounded-4px bg-gray-100 h-32px px-13px py-8px text-12px tracking-[-0.36px] font-medium';
  return (
    <div className="flex flex-col items-center">
      <Header isShowPrev={true} empty={true}>
        습득물 상세검색
      </Header>
      <section className={sectionStyle}>
        <div className="flex items-center justify-between">
          <SearchParagraph>분류</SearchParagraph>
          <div className="flex gap-14px">
            {/* button 영역 두 개 나중에 컴포넌트로 대체 예정 */}
            <button
              type="button"
              className="inline-flex h-25px w-100px items-center justify-center rounded-999px border border-solid border-gray-500 py-6px"
            >
              <div className="flex items-center justify-center ">
                <span className="text-10px leading-none">대분류 선택</span>
                <img src={select} alt="대분류 선택" />
              </div>
            </button>
            <button
              type="button"
              className="inline-flex h-25px w-100px items-center justify-center rounded-999px border border-solid border-gray-500 py-6px"
            >
              <div className="flex items-center justify-center ">
                <span className="text-10px leading-none">소분류 선택</span>
                <img src={select} alt="소분류 선택" />
              </div>
            </button>
          </div>
        </div>
        <Horizon lineBold="thin" lineWidth="short" />
      </section>
      <section className={sectionStyle}>
        <SearchDate>습득 시작일</SearchDate>
        <SearchDate>습득 종료일</SearchDate>
        <Horizon lineBold="thin" lineWidth="short" />
      </section>
      <section className={sectionStyle}>
        <div className="flex items-center justify-between">
          <SearchParagraph>습득 지역</SearchParagraph>
          <a href="/">
            <img src={icon_next} alt="습득 지역 검색하기" />
          </a>
        </div>
        <div className="flex items-center justify-between">
          <SearchParagraph>습득 장소</SearchParagraph>
          <a href="/">
            <img src={icon_next} alt="습득 지역 검색하기" />
          </a>
        </div>
        <Horizon lineBold="thin" lineWidth="short" />
      </section>
      <section className={sectionStyle}>
        <label className={inputGroupStyle}>
          <SearchParagraph>습득물명</SearchParagraph>
          <input
            className={inputStyle}
            name="findItemName"
            value={findItemName}
            onChange={(e) => {
              setFindItemName(e.target.value);
            }}
          />
        </label>
        <label className={inputGroupStyle}>
          <SearchParagraph>분실자명</SearchParagraph>
          <input
            className={inputStyle}
            name="lostPersonName"
            value={lostPersonName}
            onChange={(e) => {
              setLostPersonName(e.target.value);
            }}
          />
        </label>
      </section>
      <section className={`${sectionStyle} mt-40px items-center`}>
        <ButtonVariable
          buttonType="button"
          variant="primarySolidThin"
          buttonText="검색"
        />
        <Shortcut
          link="/"
          text="분실물 검색으로 이동하기"
          alt="분실물 검색으로 이동하기"
        />
      </section>
    </div>
  );
};

export default SearchDetail;
