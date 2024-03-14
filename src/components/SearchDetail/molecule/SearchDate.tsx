import { useId } from 'react';
import SearchParagraph from '../atom/SearchParagraph';

interface SearchDateProps {
  children: string;
  selectDate: string;
  setSelectDate: (date: string) => void;
}

const SearchDate: React.FC<SearchDateProps> = ({
  children,
  selectDate,
  setSelectDate,
}) => {
  const dateInputId = useId();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    const dateFormat = `${year}년 ${month}월 ${day}일`;

    setSelectDate(dateFormat);
  };

  return (
    <div className="flex h-20px w-316px items-center justify-between">
      <label htmlFor={dateInputId}>
        <SearchParagraph>{children}</SearchParagraph>
      </label>
      <div className="flex items-center gap-8px">
        <p className="text-12px">{selectDate}</p>
        <input
          id={dateInputId}
          type="date"
          className="date-input bg-white text-white"
          aria-label="날짜 입력"
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default SearchDate;
