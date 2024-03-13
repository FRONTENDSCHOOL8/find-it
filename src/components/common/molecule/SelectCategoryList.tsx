import { useEffect, useRef, useState } from 'react';

interface SelectCategoryListProps {
  title: string;
  dataList: string[];
  getSelectItem: (item: string) => void;
  onClose: () => void;
}

const SelectCategoryList: React.FC<SelectCategoryListProps> = ({
  title = '아이템을 선택해주세요.',
  dataList,
  getSelectItem,
  onClose,
}) => {
  /* -------------------------------------------------------------------------- */
  //함수 본문

  const [selectedItem, setSelectedItem] = useState<string>('');
  const ulRef = useRef<HTMLUListElement>(null);
  const defaultColor = '#666';
  const selectedColor = '#4785ff';
  const checkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={13}
      viewBox="0 0 19 13"
      fill="none"
    >
      <path
        d="M1 5.5L7 11.5L17.5 1"
        stroke="#4785FF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  /* -------------------------------------------------------------------------- */
  // 클릭한 아이템값 가져오기
  const handleClickItem = (
    item: string,
    event?: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event?.preventDefault();
    setSelectedItem(item);
    getSelectItem(item);
  };

  /* -------------------------------------------------------------------------- */
  // 바깥 영역 클릭시 컴포넌트 사라짐
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectedItem &&
        ulRef.current &&
        !ulRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, selectedItem]);

  /* -------------------------------------------------------------------------- */
  // jsx 반환
  return (
    <div className="fixed inset-0 z-30	bg-[#00000045]">
      <ul
        ref={ulRef}
        style={{ scrollbarWidth: 'none' }}
        className="absolute bottom-0 left-1/2 h-3/4 w-full max-w-400px translate-x-[-50%] overflow-auto rounded-t-40px bg-white px-40px pt-40px"
      >
        <h3 className="pb-36px text-18px">{title}</h3>
        {dataList.map((item, index) => (
          <li
            className="flex items-center justify-between pb-20px"
            key={index}
            style={{
              color: `${(selectedItem === item && selectedColor) || defaultColor}`,
            }}
          >
            <button onClick={() => handleClickItem(item)}>{item}</button>
            {selectedItem === item && checkIcon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectCategoryList;
