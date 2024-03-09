import Header from '@/components/Header/Header';
import { useState } from 'react';

const Categories = () => {
  const [activeButton, setActiveButton] = useState('notice');

  const handleClick = (type: string) => {
    setActiveButton(type);
  };

  return (
    <div className="flex">
      <button
        className="w-1/2 border-b-[1px] border-black pb-12px pt-13px text-center text-14px"
        onClick={() => handleClick('notice')}
      >
        내 키워드 알림
      </button>
      <button
        className="w-1/2 border-b-[1px] pb-12px pt-13px text-center text-14px"
        onClick={() => handleClick('setting')}
      >
        키워드 설정
      </button>
    </div>
  );
};

const Notification = () => {
  return (
    <div>
      <Header isShowPrev={true} children="키워드 알림" empty={true} />
      <Categories />
    </div>
  );
};

export default Notification;
