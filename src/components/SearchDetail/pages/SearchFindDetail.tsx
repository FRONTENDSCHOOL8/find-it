import Header from '@/components/Header/Header';
import SearchDate from '../molecule/SearchDate';
import Horizon from '@/components/common/atom/Horizon';
import SearchParagraph from '../atom/SearchParagraph';
import ButtonVariable from '@/components/common/molecule/ButtonVariable';
import Shortcut from '@/components/Shortcut/Shortcut';
import select from '@/assets/search/select.svg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSearchFindData } from '@/lib/utils/getAPIData';
import useSearchStore from '@/store/search/searchStore';
import getFormattedDate from '@/lib/utils/getFormattedDate';

interface SearchData {
  body?: {
    items?: {
      item: object[];
    };
  };
}

interface Category {
  value: string;
  label: string;
}

const SearchFindDetail: React.FC = () => {
  // const [selectStartDate, setSelectStartDate] =
  //   useState<string>('날짜를 선택하세요.');
  // const [selectEndDate, setSelectEndDate] =
  //   useState<string>('날짜를 선택하세요.');
  // const [selectedMainCategoryValue, setSelectedMainCategoryValue] =
  //   useState<string>('');
  // const [selectedSubCategoryValue, setSelectedSubCategoryValue] =
  //   useState<string>('');
  // const [selectedAreaValue, setSelectedAreaValue] = useState<string>('');

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
  // const inputGroupStyle = 'flex justify-between items-center gap-25px';
  // const inputStyle =
  //   'focus:border focus:outline-none focus:border-solid focus:border-primary w-246px rounded-4px bg-gray-100 h-32px px-13px py-8px text-12px tracking-[-0.36px] font-medium';

  const mainCategories: Category[] = [
    { value: '', label: '대분류 선택' },
    { value: 'PRA000', label: '가방' },
    { value: 'PRB000', label: '도서용품' },
    { value: 'PRC000', label: '서류' },
    { value: 'PRD000', label: '산업용품' },
    { value: 'PRE000', label: '스포츠용품' },
    { value: 'PRF000', label: '자동차' },
    { value: 'PRG000', label: '전자기기' },
    { value: 'PRH000', label: '지갑' },
    { value: 'PRI000', label: '컴퓨터' },
    { value: 'PRJ000', label: '휴대폰' },
    { value: 'PRK000', label: '의류' },
    { value: 'PRL000', label: '현금' },
    { value: 'PRM000', label: '유가증권' },
    { value: 'PRN000', label: '증명서' },
    { value: 'PRO000', label: '귀금속' },
    { value: 'PRP000', label: '카드' },
    { value: 'PRQ000', label: '쇼핑백' },
    { value: 'PRR000', label: '악기' },
    { value: 'PRZ000', label: '기타물품' },
  ];

  const subCategories: Record<string, { value: string; label: string }[]> = {
    '': [{ value: '00', label: '소분류 선택' }],
    PRA000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRA100', label: '여성용가방' },
      { value: 'PRA200', label: '남성용가방' },
      { value: 'PRA300', label: '기타가방' },
    ],
    PRB000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRB100', label: '학습서적' },
      { value: 'PRB200', label: '소설' },
      { value: 'PRB300', label: '컴퓨터서적' },
      { value: 'PRB400', label: '만화책' },
      { value: 'PRB500', label: '기타서적' },
    ],
    PRC000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRC100', label: '서류' },
      { value: 'PRC200', label: '기타물품' },
    ],
    PRD000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRD100', label: '기타물품' },
    ],
    PRE000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRE100', label: '기타용품' },
    ],
    PRF000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRF100', label: '자동차열쇠' },
      { value: 'PRF200', label: '네비게이션' },
      { value: 'PRF300', label: '자동차번호판' },
      { value: 'PRF400', label: '기타용품' },
      { value: 'PRF500', label: '임시번호판' },
    ],
    PRG000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRG100', label: 'PMP' },
      { value: 'PRG200', label: 'MP3' },
      { value: 'PRG300', label: 'PDA' },
      { value: 'PRG400', label: '카메라' },
      { value: 'PRG500', label: '전자수첩' },
      { value: 'PRG600', label: '기타용품' },
    ],
    PRH000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRH100', label: '여성용 지갑' },
      { value: 'PRH200', label: '남성용 지갑' },
      { value: 'PRH300', label: '기타 지갑' },
    ],
    PRI000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRI100', label: '삼성노트북' },
      { value: 'PRI200', label: 'LG노트북' },
      { value: 'PRI300', label: '삼보노트북' },
      { value: 'PRI400', label: '기타' },
      { value: 'PRI500', label: 'HP노트북' },
    ],
    PRJ000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRJ100', label: '삼성휴대폰' },
      { value: 'PRJ200', label: 'LG휴대폰' },
      { value: 'PRJ300', label: '스카이휴대폰' },
      { value: 'PRJ400', label: '아이폰' },
      { value: 'PRJ500', label: '기타통신기기' },
      { value: 'PRJ600', label: '모토로라휴대폰' },
    ],
    PRK000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRK100', label: '여성의류' },
      { value: 'PRK200', label: '남성의류' },
      { value: 'PRK300', label: '아기의류' },
      { value: 'PRK400', label: '기타의류' },
    ],
    PRL000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRL100', label: '현금' },
      { value: 'PRL200', label: '수표' },
      { value: 'PRL300', label: '기타' },
      { value: 'PRL400', label: '외화' },
    ],
    PRM000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRM100', label: '어음' },
      { value: 'PRM200', label: '상품권' },
      { value: 'PRM300', label: '채권' },
      { value: 'PRM400', label: '기타' },
    ],
    PRN000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRN100', label: '신분증' },
      { value: 'PRN200', label: '면허증' },
      { value: 'PRN300', label: '여권' },
      { value: 'PRN400', label: '기타' },
      { value: 'PRN500', label: '판결문' },
    ],
    PRO000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRO100', label: '반지' },
      { value: 'PRO200', label: '목걸이' },
      { value: 'PRO300', label: '귀걸이' },
      { value: 'PRO400', label: '시계' },
      { value: 'PRO500', label: '기타' },
    ],
    PRP000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRP100', label: '신용(체크)카드' },
      { value: 'PRP200', label: '일반카드' },
      { value: 'PRP300', label: '기타카드' },
    ],
    PRQ000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRQ100', label: '쇼핑백' },
    ],
    PRR000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRR100', label: '건반악기' },
      { value: 'PRR200', label: '관악기' },
      { value: 'PRR300', label: '타악기' },
      { value: 'PRR400', label: '현악기' },
      { value: 'PRR900', label: '기타악기' },
    ],
    PRZ000: [
      { value: '00', label: '소분류 선택' },
      { value: 'PRZ100', label: '기타' },
    ],
  };

  const areas: Category[] = [
    { value: '', label: '시/도' },
    { value: 'LCA000', label: '서울특별시' },
    { value: 'LCI000', label: '경기도' },
    { value: 'LCV000', label: '인천광역시' },
    { value: 'LCH000', label: '강원도' },
    { value: 'LCJ000', label: '경상남도' },
    { value: 'LCK000', label: '경상북도' },
    { value: 'LCR000', label: '대구광역시' },
    { value: 'LCU000', label: '울산광역시' },
    { value: 'LCT000', label: '부산광역시' },
    { value: 'LCL000', label: '전라남도' },
    { value: 'LCM000', label: '전라북도' },
    { value: 'LCQ000', label: '광주광역시' },
    { value: 'LCN000', label: '충청남도' },
    { value: 'LCO000', label: '충청북도' },
    { value: 'LCS000', label: '대전광역시' },
    { value: 'LCW000', label: '세종특별자치시' },
    { value: 'LCP000', label: '제주특별자치도' },
    { value: 'LCE000', label: '기타' },
    { value: 'LCF000', label: '해외' },
  ];

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
      alert('습득 시작일을 선택하세요.');
    } else if (selectEndDate === '날짜를 선택하세요.') {
      alert('습득 종료일을 선택하세요.');
    } else {
      navigate('/searchResult');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchData = await getSearchFindData({
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
        습득물 상세검색
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
            <SearchParagraph>습득 지역</SearchParagraph>
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
            습득 시작일
          </SearchDate>
          <SearchDate
            selectDate={selectEndDate}
            setSelectDate={setSelectEndDate}
          >
            습득 종료일
          </SearchDate>
        </section>
        <section className={`${sectionStyle} mt-40px items-center`}>
          <ButtonVariable
            variant="primarySolidThin"
            buttonText="검색"
            onClick={handleSearchButtonClick}
          />
          <Shortcut
            link="/"
            text="분실물 검색으로 이동하기"
            alt="분실물 검색으로 이동하기"
          />
        </section>
      </form>
    </div>
  );
};

export default SearchFindDetail;
