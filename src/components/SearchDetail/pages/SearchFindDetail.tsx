import Header from '@/components/Header/Header';
import SearchDate from '../molecule/SearchDate';
import Horizon from '@/components/common/atom/Horizon';
import SearchParagraph from '../atom/SearchParagraph';
import ButtonVariable from '@/components/common/molecule/ButtonVariable';
import Shortcut from '@/components/Shortcut/Shortcut';
import icon_next from '@/assets/icons/icon_next.svg';
import select from '@/assets/search/select.svg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { xmlToJson } from '@/lib/utils/xmlToJson';
import { raiseValue } from '@/lib/utils/raiseValue';
import { JsonObject } from '@/types/types';

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
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
  const [selectStartDate, setSelectStartDate] =
    useState<string>('날짜를 선택하세요.');
  const [selectEndDate, setSelectEndDate] =
    useState<string>('날짜를 선택하세요.');
  const [selectedMainCategoryValue, setSelectedMainCategoryValue] =
    useState<string>('');
  const [selectedSubCategoryValue, setSelectedSubCategoryValue] =
    useState<string>('');
  const [selectedMainAreaValue, setSelectedMainAreaValue] =
    useState<string>('');
  const [selectedSubAreaValue, setSelectedAreaSubCategoryValue] =
    useState<string>('');

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

  const mainAreas: Category[] = [
    { value: '', label: '시/도' },
    { value: 'LCA000', label: '서울특별시' },
    { value: 'LCE000', label: '기타' },
    { value: 'LCF000', label: '해외' },
    { value: 'LCH000', label: '강원도' },
    { value: 'LCI000', label: '경기도' },
    { value: 'LCJ000', label: '경상남도' },
    { value: 'LCK000', label: '경상북도' },
    { value: 'LCL000', label: '전라남도' },
    { value: 'LCM000', label: '전라북도' },
    { value: 'LCN000', label: '충청남도' },
    { value: 'LCO000', label: '충청북도' },
    { value: 'LCP000', label: '제주특별자치도' },
    { value: 'LCQ000', label: '광주광역시' },
    { value: 'LCR000', label: '대구광역시' },
    { value: 'LCS000', label: '대전광역시' },
    { value: 'LCT000', label: '부산광역시' },
    { value: 'LCU000', label: '울산광역시' },
    { value: 'LCV000', label: '인천광역시' },
    { value: 'LCW000', label: '세종특별자치시' },
  ];

  const subAreas: Record<string, { value: string; label: string }[]> = {
    '': [{ value: '00', label: '소분류 선택' }],
    LCA000: [
      { value: 'LCA001', label: '강남구' },
      { value: 'LCA002', label: '강동구' },
      { value: 'LCA003', label: '강북구' },
      { value: 'LCA004', label: '강서구' },
      { value: 'LCA005', label: '관악구' },
      { value: 'LCA006', label: '광진구' },
      { value: 'LCA007', label: '구로구' },
      { value: 'LCA008', label: '금천구' },
      { value: 'LCA009', label: '노원구' },
      { value: 'LCA010', label: '도봉구' },
      { value: 'LCA011', label: '동대문구' },
      { value: 'LCA012', label: '마포구' },
      { value: 'LCA013', label: '서대문구' },
      { value: 'LCA014', label: '서초구' },
      { value: 'LCA015', label: '성동구' },
      { value: 'LCA016', label: '성북구' },
      { value: 'LCA017', label: '송파구' },
      { value: 'LCA018', label: '양천구' },
      { value: 'LCA019', label: '영등포구' },
      { value: 'LCA020', label: '용산구' },
      { value: 'LCA021', label: '은평구' },
      { value: 'LCA022', label: '종로구' },
      { value: 'LCA023', label: '중구' },
      { value: 'LCA024', label: '중량구' },
      { value: 'LCA025', label: '동작구' },
    ],
    LCE000: [{ value: '00', label: '기타' }],
    LCF000: [{ value: '00', label: '해외' }],
    LCH000: [
      { value: 'LCH001', label: '강릉시' },
      { value: 'LCH002', label: '고성군' },
      { value: 'LCH003', label: '동해시' },
      { value: 'LCH004', label: '삼척시' },
      { value: 'LCH005', label: '속초시' },
      { value: 'LCH006', label: '양구군' },
      { value: 'LCH007', label: '양양군' },
      { value: 'LCH008', label: '영월군' },
      { value: 'LCH009', label: '원주시' },
      { value: 'LCH010', label: '인제군' },
      { value: 'LCH011', label: '정선군' },
      { value: 'LCH012', label: '철원군' },
      { value: 'LCH013', label: '춘천시' },
      { value: 'LCH014', label: '태백시' },
      { value: 'LCH015', label: '평창군' },
      { value: 'LCH016', label: '홍천군' },
      { value: 'LCH017', label: '화천군' },
      { value: 'LCH018', label: '횡성군' },
    ],
    LCI000: [
      { value: 'LCI001', label: '가평군' },
      { value: 'LCI002', label: '고양시 덕양구' },
      { value: 'LCI003', label: '고양시 일산동구' },
      { value: 'LCI004', label: '고양시 일산서구' },
      { value: 'LCI005', label: '과천시' },
      { value: 'LCI006', label: '광명시' },
      { value: 'LCI007', label: '광주시' },
      { value: 'LCI008', label: '구리시' },
      { value: 'LCI009', label: '군포시' },
      { value: 'LCI010', label: '김포시' },
      { value: 'LCI011', label: '남양주시' },
      { value: 'LCI012', label: '동두천시' },
      { value: 'LCI013', label: '부천시 소사구' },
      { value: 'LCI014', label: '부천시 오정구' },
      { value: 'LCI015', label: '부천시 원미구' },
      { value: 'LCI016', label: '성남시 분당구' },
      { value: 'LCI017', label: '성남시 수정구' },
      { value: 'LCI018', label: '성남시 중원구' },
      { value: 'LCI019', label: '수원시 권선구' },
      { value: 'LCI020', label: '수원시 영통구' },
      { value: 'LCI021', label: '수원시 장안구' },
      { value: 'LCI022', label: '수원시 팔달구' },
      { value: 'LCI023', label: '시흥시' },
      { value: 'LCI024', label: '안산시 단원구' },
      { value: 'LCI025', label: '안산시 상록구' },
      { value: 'LCI026', label: '안성시' },
      { value: 'LCI027', label: '안양시 동안구' },
      { value: 'LCI028', label: '안양시 만안구' },
      { value: 'LCI029', label: '양주시' },
      { value: 'LCI030', label: '양평군' },
      { value: 'LCI031', label: '여주군' },
      { value: 'LCI032', label: '연천군' },
      { value: 'LCI033', label: '오산시' },
      { value: 'LCI034', label: '용인시 기흥구' },
      { value: 'LCI035', label: '용인시 수지구' },
      { value: 'LCI036', label: '용인시 처인구' },
      { value: 'LCI037', label: '의왕시' },
      { value: 'LCI038', label: '의정부시' },
      { value: 'LCI039', label: '이천시' },
      { value: 'LCI040', label: '파주시' },
      { value: 'LCI041', label: '평택시' },
      { value: 'LCI042', label: '포천시' },
      { value: 'LCI043', label: '하남시' },
      { value: 'LCI044', label: '화성시' },
    ],
    LCJ000: [
      { value: 'LCJ001', label: '거제시' },
      { value: 'LCJ002', label: '거창군' },
      { value: 'LCJ003', label: '고성군' },
      { value: 'LCJ004', label: '김해시' },
      { value: 'LCJ005', label: '남해군' },
      { value: 'LCJ006', label: '밀양시' },
      { value: 'LCJ007', label: '사천시' },
      { value: 'LCJ008', label: '산청군' },
      { value: 'LCJ009', label: '양산시' },
      { value: 'LCJ010', label: '의령군' },
      { value: 'LCJ011', label: '진주시' },
      { value: 'LCJ012', label: '창녕군' },
      { value: 'LCJ013', label: '창원시 마산합포구' },
      { value: 'LCJ014', label: '창원시 마산회원구' },
      { value: 'LCJ015', label: '창원시 성산구' },
      { value: 'LCJ016', label: '창원시 의창구' },
      { value: 'LCJ017', label: '창원시 진해구' },
      { value: 'LCJ018', label: '통영시' },
      { value: 'LCJ019', label: '하동군' },
      { value: 'LCJ020', label: '함안군' },
      { value: 'LCJ021', label: '함양군' },
      { value: 'LCJ022', label: '합천군' },
    ],
    LCK000: [
      { value: 'LCK001', label: '경산시' },
      { value: 'LCK002', label: '경주시' },
      { value: 'LCK003', label: '고령군' },
      { value: 'LCK004', label: '구미시' },
      { value: 'LCK005', label: '군위군' },
      { value: 'LCK006', label: '김천시' },
      { value: 'LCK007', label: '문경시' },
      { value: 'LCK008', label: '봉화군' },
      { value: 'LCK009', label: '상주시' },
      { value: 'LCK010', label: '성주군' },
      { value: 'LCK011', label: '안동시' },
      { value: 'LCK012', label: '영덕군' },
      { value: 'LCK013', label: '영양군' },
      { value: 'LCK014', label: '영주시' },
      { value: 'LCK015', label: '영천시' },
      { value: 'LCK016', label: '예천군' },
      { value: 'LCK017', label: '울릉군' },
      { value: 'LCK018', label: '울진군' },
      { value: 'LCK019', label: '의성군' },
      { value: 'LCK020', label: '청도군' },
      { value: 'LCK021', label: '청송군' },
      { value: 'LCK022', label: '칠곡군' },
      { value: 'LCK023', label: '포항시 남구' },
      { value: 'LCK024', label: '포항시 북구' },
    ],
    LCL000: [
      { value: 'LCL001', label: '강진군' },
      { value: 'LCL002', label: '고흥군' },
      { value: 'LCL003', label: '곡성군' },
      { value: 'LCL004', label: '광양시' },
      { value: 'LCL005', label: '구례군' },
      { value: 'LCL006', label: '나주시' },
      { value: 'LCL007', label: '담양군' },
      { value: 'LCL008', label: '목포시' },
      { value: 'LCL009', label: '무안군' },
      { value: 'LCL010', label: '보성군' },
      { value: 'LCL011', label: '순천시' },
      { value: 'LCL012', label: '신안군' },
      { value: 'LCL013', label: '여수시' },
      { value: 'LCL014', label: '영광군' },
      { value: 'LCL015', label: '영암군' },
      { value: 'LCL016', label: '완도군' },
      { value: 'LCL017', label: '장성군' },
      { value: 'LCL018', label: '장흥군' },
      { value: 'LCL019', label: '진도군' },
      { value: 'LCL020', label: '함평군' },
      { value: 'LCL021', label: '해남군' },
      { value: 'LCL022', label: '화순군' },
    ],
    LCM000: [
      { value: 'LCM001', label: '고창군' },
      { value: 'LCM002', label: '군산시' },
      { value: 'LCM003', label: '김제시' },
      { value: 'LCM004', label: '남원시' },
      { value: 'LCM005', label: '무주군' },
      { value: 'LCM006', label: '부안군' },
      { value: 'LCM007', label: '순창군' },
      { value: 'LCM008', label: '완주군' },
      { value: 'LCM009', label: '익산시' },
      { value: 'LCM010', label: '임실군' },
      { value: 'LCM011', label: '장수군' },
      { value: 'LCM012', label: '전주시 덕진구' },
      { value: 'LCM013', label: '전주시 완산구' },
      { value: 'LCM014', label: '정읍시' },
      { value: 'LCM015', label: '진안군' },
    ],
    LCN000: [
      { value: 'LCN001', label: '계룡시' },
      { value: 'LCN002', label: '공주시' },
      { value: 'LCN003', label: '금산군' },
      { value: 'LCN004', label: '논산시' },
      { value: 'LCN005', label: '당진시' },
      { value: 'LCN006', label: '보령시' },
      { value: 'LCN007', label: '부여군' },
      { value: 'LCN008', label: '서산시' },
      { value: 'LCN009', label: '서천군' },
      { value: 'LCN010', label: '아산시' },
      { value: 'LCN011', label: '연기군' },
      { value: 'LCN012', label: '예산군' },
      { value: 'LCN013', label: '천안시 동남구' },
      { value: 'LCN014', label: '천안시 서북구' },
      { value: 'LCN015', label: '청양군' },
      { value: 'LCN016', label: '태안군' },
      { value: 'LCN017', label: '홍성군' },
    ],
    LCO000: [
      { value: 'LCO001', label: '괴산군' },
      { value: 'LCO002', label: '단양군' },
      { value: 'LCO003', label: '보은군' },
      { value: 'LCO004', label: '영동군' },
      { value: 'LCO005', label: '옥천군' },
      { value: 'LCO006', label: '음성군' },
      { value: 'LCO007', label: '제천시' },
      { value: 'LCO008', label: '증평군' },
      { value: 'LCO009', label: '진천군' },
      { value: 'LCO010', label: '청원군' },
      { value: 'LCO011', label: '청주시 상당구' },
      { value: 'LCO012', label: '청주시 흥덕구' },
      { value: 'LCO013', label: '충주시' },
    ],
    LCP000: [
      { value: 'LCP001', label: '서귀포시' },
      { value: 'LCP002', label: '제주시' },
    ],
    LCQ000: [
      { value: 'LCQ001', label: '광산구' },
      { value: 'LCQ002', label: '남구' },
      { value: 'LCQ003', label: '동구' },
      { value: 'LCQ004', label: '북구' },
      { value: 'LCQ005', label: '서구' },
    ],
    LCR000: [
      { value: 'LCR001', label: '남구' },
      { value: 'LCR002', label: '달서구' },
      { value: 'LCR003', label: '달성군' },
      { value: 'LCR004', label: '동구' },
      { value: 'LCR005', label: '북구' },
      { value: 'LCR006', label: '서구' },
      { value: 'LCR007', label: '수성구' },
      { value: 'LCR008', label: '중구' },
    ],
    LCS000: [
      { value: 'LCS001', label: '대덕구' },
      { value: 'LCS002', label: '동구' },
      { value: 'LCS003', label: '서구' },
      { value: 'LCS004', label: '유성구' },
      { value: 'LCS005', label: '중구' },
    ],
    LCT000: [
      { value: 'LCT001', label: '강서구' },
      { value: 'LCT002', label: '금정구' },
      { value: 'LCT003', label: '기장군' },
      { value: 'LCT004', label: '남구' },
      { value: 'LCT005', label: '동구' },
      { value: 'LCT006', label: '동래구' },
      { value: 'LCT007', label: '부산진구' },
      { value: 'LCT008', label: '북구' },
      { value: 'LCT009', label: '사상구' },
      { value: 'LCT010', label: '사하구' },
      { value: 'LCT011', label: '서구' },
      { value: 'LCT012', label: '수영구' },
      { value: 'LCT013', label: '연제구' },
      { value: 'LCT014', label: '영도구' },
      { value: 'LCT015', label: '중구' },
      { value: 'LCT016', label: '해운대구' },
    ],
    LCU000: [
      { value: 'LCU001', label: '남구' },
      { value: 'LCU002', label: '동구' },
      { value: 'LCU003', label: '북구' },
      { value: 'LCU004', label: '울주군' },
      { value: 'LCU005', label: '중구' },
    ],
    LCV000: [
      { value: 'LCV001', label: '강화군' },
      { value: 'LCV002', label: '계양구' },
      { value: 'LCV003', label: '남구' },
      { value: 'LCV004', label: '남동구' },
      { value: 'LCV005', label: '동구' },
      { value: 'LCV006', label: '부평구' },
      { value: 'LCV007', label: '서구' },
      { value: 'LCV008', label: '연수구' },
      { value: 'LCV009', label: '옹진군' },
      { value: 'LCV010', label: '중구' },
    ],
    LCW000: [
      { value: 'LCW001', label: '소정면' },
      { value: 'LCW002', label: '전의면' },
      { value: 'LCW003', label: '연서면' },
      { value: 'LCW004', label: '연기면' },
      { value: 'LCW005', label: '한솔동' },
      { value: 'LCW006', label: '장군면' },
      { value: 'LCW007', label: '전동면' },
      { value: 'LCW008', label: '조치원읍' },
      { value: 'LCW009', label: '연동면' },
      { value: 'LCW010', label: '부강면' },
      { value: 'LCW011', label: '금남면' },
      { value: 'LCW012', label: '도담동' },
    ],
  };

  const handleMainSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedMainCategoryValue(value);
    setSelectedSubCategoryValue('');
  };

  const handleSubSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSubCategoryValue(value);
  };

  const getSearchData = async (query = {}) => {
    try {
      const params = new URLSearchParams(query);

      const response = await fetch(
        `${import.meta.env.VITE_GET_FIND_DATA_CATEGORY_API_URL}?serviceKey=${import.meta.env.VITE_GET_DATA_API_KEY_ENC}&${params.toString()}`
      );

      if (!response.ok) {
        throw new Error('네트워크 응답 없음');
      }

      const data = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'text/xml');
      const json = xmlToJson(xml);

      if (typeof json === 'string') {
        throw new Error('json is string');
      }

      return json.response;
    } catch (error) {
      console.error('error: ' + error);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      // const data = await getAllData({
      //   pageNo: 2,
      //   numOfRows: 100,
      // });

      // console.log(data);

      const searchData = await getSearchData({
        PRDT_CL_CD_01: selectedMainCategoryValue,
        PRDT_CL_CD_02: selectedSubCategoryValue,

        pageNo: 1,
        numOfRows: 10,
      });

      if (typeof searchData === 'object') {
        const resultData = (searchData as SearchData).body?.items?.item;
        console.log(resultData);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [selectedMainCategoryValue, selectedSubCategoryValue]);

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
                  onChange={handleMainSelectChange}
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
                  onChange={handleSubSelectChange}
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
          <Horizon lineBold="thin" lineWidth="short" />
          <div className="flex items-center justify-between">
            <SearchParagraph>습득 지역</SearchParagraph>
            <a href="/">
              <img src={icon_next} alt="습득 지역 검색하기" />
            </a>
          </div>
        </section>
        <section className={`${sectionStyle} mt-40px items-center`}>
          <Link to="/searchResult">
            <ButtonVariable variant="primarySolidThin" buttonText="검색" />
          </Link>
          <Shortcut
            link="/searchlost"
            text="분실물 검색으로 이동하기"
            alt="분실물 검색으로 이동하기"
          />
        </section>
      </form>
    </div>
  );
};

export default SearchFindDetail;
