import Header from '@/components/Header/Header';
import SearchDate from '../molecule/SearchDate';
import Horizon from '@/components/common/atom/Horizon';
import SearchParagraph from '../atom/SearchParagraph';
import ButtonVariable from '@/components/common/molecule/ButtonVariable';
import Shortcut from '@/components/Shortcut/Shortcut';
import select from '@/assets/search/select.svg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSearchLostData } from '@/lib/utils/getAPIData';
import useSearchStore from '@/store/search/searchStore';
import getFormattedDate from '@/lib/utils/getFormattedDate';
import { mainCategories, subCategories, areas } from '../data';

interface SearchData {
  body?: {
    items?: {
      item: object[];
    };
  };
}

const SearchLostDetail: React.FC = () => {
  const {
    selectStartDate,
    setSelectStartDate,
    selectEndDate,
    setSelectEndDate,
    selectedMainCategoryValue,
    setSelectedMainCategoryValue,
    selectedSubCategoryValue,
    setSelectedSubCategoryValue,
    selectedAreaValue,
    setSelectedAreaValue,
  } = useSearchStore();

  const navigate = useNavigate();

  const sectionStyle = 'flex flex-col gap-20px justify-center pt-20px';

  const handleMainCategoriesSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSelectedMainCategoryValue(value);
    setSelectedSubCategoryValue('');
  };

  const handleSubCategoriesSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSelectedSubCategoryValue(value);
  };

  const handleAreasSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedAreaValue(value);
  };

  const handleSearchButtonClick = () => {
    if (selectStartDate === '날짜를 선택하세요.') {
      alert('분실 시작일을 선택하세요.');
    } else if (selectEndDate === '날짜를 선택하세요.') {
      alert('분실 종료일을 선택하세요.');
    } else {
      navigate('/searchlostresult');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchData = await getSearchLostData({
          PRDT_CL_CD_01: selectedMainCategoryValue,
          PRDT_CL_CD_02: selectedSubCategoryValue,
          LST_LCT_CD: selectedAreaValue,
          START_YMD:
            selectStartDate !== '날짜를 선택하세요.'
              ? getFormattedDate(selectStartDate)
              : '',
          END_YMD:
            selectEndDate !== '날짜를 선택하세요.'
              ? getFormattedDate(selectEndDate)
              : '',
          pageNo: 1,
          numOfRows: 6,
        });

        if (typeof searchData === 'object') {
          const resultData = (searchData as SearchData).body?.items?.item;
          useSearchStore.setState({ resultData });
        }
      } catch (error) {
        console.error('error: ' + error);
      }
    };

    fetchData();
  }, [
    selectedMainCategoryValue,
    selectedSubCategoryValue,
    selectedAreaValue,
    selectStartDate,
    selectEndDate,
  ]);

  return (
    <div className="flex flex-col items-center">
      <Header isShowPrev={true} empty={true}>
        분실물 상세검색
      </Header>
      <form>
        <section className={sectionStyle}>
          <div className="flex items-center justify-between">
            <SearchParagraph>분류</SearchParagraph>
            <div className="flex h-25px w-274px justify-end gap-14px">
              <div className="relative inline-block">
                <select
                  id="mainCategory"
                  value={selectedMainCategoryValue}
                  onChange={handleMainCategoriesSelectChange}
                  className="hover: flex h-25px w-87px appearance-none items-center justify-center rounded-full border border-gray-500 pl-14px text-10px"
                >
                  {mainCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <img
                  src={select}
                  alt="대분류 선택"
                  className="pointer-events-none absolute bottom-0 right-10px top-7px h-11px w-9px"
                />
              </div>
              <div className="relative inline-block">
                <select
                  id="subCategory"
                  value={selectedSubCategoryValue}
                  onChange={handleSubCategoriesSelectChange}
                  className="flex h-25px w-87px appearance-none items-center justify-center rounded-full border border-gray-350 px-14px text-10px"
                >
                  {subCategories[selectedMainCategoryValue] &&
                    subCategories[selectedMainCategoryValue].map(
                      (subCategory) => (
                        <option
                          key={subCategory.value}
                          value={subCategory.value}
                        >
                          {subCategory.label}
                        </option>
                      )
                    )}
                </select>
                <img
                  src={select}
                  alt="소분류 선택"
                  className="pointer-events-none absolute bottom-0 right-10px top-7px h-11px w-9px"
                />
              </div>
            </div>
          </div>
          <Horizon lineBold="thin" lineWidth="short" />
        </section>
        <section className={sectionStyle}>
          <div className="flex items-center justify-between">
            <SearchParagraph>분실 지역</SearchParagraph>
            <div className="flex h-25px w-274px justify-end gap-14px">
              <div className="relative inline-block">
                <select
                  id="area"
                  value={selectedAreaValue}
                  onChange={handleAreasSelectChange}
                  className="hover: flex h-25px w-87px appearance-none items-center justify-center rounded-full border border-gray-500 pl-14px text-10px"
                >
                  {areas.map((area) => (
                    <option key={area.value} value={area.value}>
                      {area.label}
                    </option>
                  ))}
                </select>
                <img
                  src={select}
                  alt="시/도 선택"
                  className="pointer-events-none absolute bottom-0 right-10px top-7px h-11px w-9px"
                />
              </div>
            </div>
          </div>
          <Horizon lineBold="thin" lineWidth="short" />
        </section>
        <section className={sectionStyle}>
          <SearchDate
            selectDate={selectStartDate}
            setSelectDate={setSelectStartDate}
          >
            분실 시작일
          </SearchDate>
          <SearchDate
            selectDate={selectEndDate}
            setSelectDate={setSelectEndDate}
          >
            분실 종료일
          </SearchDate>
        </section>
        <section className={`${sectionStyle} mt-40px items-center`}>
          <ButtonVariable
            variant="primarySolidThin"
            buttonText="검색"
            onClick={handleSearchButtonClick}
          />
          <Shortcut
            link="/searchfind"
            text="습득물 검색으로 이동하기"
            alt="습득물물 검색으로 이동하기"
          />
        </section>
      </form>
    </div>
  );
};

export default SearchLostDetail;
