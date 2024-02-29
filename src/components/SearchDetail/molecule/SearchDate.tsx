import { useId, useState } from 'react';

interface SearchDateProps {
  children: string;
}

const SearchDate: React.FC<SearchDateProps> = ({ children }) => {
  const dateInputId = useId();
  const [selectDate, setSelectDate] = useState('날짜를 선택하세요.');

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
      <label
        htmlFor={dateInputId}
        className="text-12px font-medium tracking-[-0.36px]"
      >
        {children}
      </label>
      <div className="flex items-center gap-8px">
        <p className="text-12px">{selectDate}</p>
        <input
          required
          id={dateInputId}
          type="date"
          className="date-input"
          aria-label="날짜 입력"
          onChange={handleDateChange}
          value={selectDate}
        />
      </div>
    </div>
  );
};

export default SearchDate;
