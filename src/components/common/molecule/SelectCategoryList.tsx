import { useState } from 'react';

interface SelectCategoryListProps {
  title: string;
  dataList: string[];
  getSelectItem: (item: string) => void; // getSelectItem 함수 추가
}

const SelectCategoryList: React.FC<SelectCategoryListProps> = ({
  title = '아이템을 선택해주세요.',
  dataList,
  getSelectItem,
}) => {
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
  const [selectedItem, setSelectedItem] = useState<string>('');
  const defaultColor = '#666';
  const selectedColor = '#4785ff';

  const handleClickItem = (
    item: string,
    event?: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event?.preventDefault();
    setSelectedItem(item);
    getSelectItem(item);
  };

  return (
    <div className="fixed inset-0	bg-[#00000045]">
      <ul
        style={{ scrollbarWidth: 'none' }}
        className="z-1 absolute bottom-0 h-3/4 w-full overflow-auto rounded-t-40px bg-white px-40px pt-40px"
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
