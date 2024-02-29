import { useEffect, useState } from 'react';

export const DataList = {
  서울: ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구'],
  경기: ['가평군', '고양시', '과천시', '광명시', '광주시'],
  인천: ['강화군', '계양구', '남동구', '동구'],
};
const liColor = '#666';

export const 주소확인 = () => {
  const [주소데이터, 셋주소데이터] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          'https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=3587ff3e-9d2b-43a6-9fe9-a838d6b1014c'
        );

        if (!response.ok) {
          throw new Error('fetch 에러');
        }

        const jsondata = await response.json();

        console.log(jsondata);

        셋주소데이터(jsondata);
      } catch (error) {
        console.error('에러남: ' + error);
      }
    })();
  }, []);

  return <>{주소데이터.}</>;
};



interface SelectCategoryListProps {
  title: string;
  dataList: [];
 }


const SelectCategoryList: React.FC<SelectCategoryListProps> 
= (
  { title,
  dataList}
  

) => {
  return (
    <div className="fixed inset-0	bg-[#00000045]">
      <ul className="z-1 absolute bottom-0 w-full rounded-t-40px bg-white pl-40px pt-40px">
        <h3 className="pb-36px text-18px">{title}</h3>
        {Object.keys({dataList}).map((firstItem) => (
          <li
            className="pb-20px"
            key={firstItem}
            style={{ color: `${liColor}` }}
          >
            <a href="/">{firstItem}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectCategoryList;

// export const SecondCategory = ({ selectedArea }) => {
//   const secondList = DataList[selectedArea];
//   return (
//     <div className="fixed inset-0	bg-[#00000045]">
//       <ul className="z-1 absolute bottom-0 w-full rounded-t-40px bg-white pb-20px pl-40px pt-50px">
//         <h3 className="pb-30px text-18px">거주지역을 선택해주세요.</h3>
//         {secondList.map((secondItem) => (
//           <li
//             className="pb-20px"
//             key={secondItem}
//             style={{ color: `${liColor}` }}
//           >
//             <a href="/">{secondItem}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
