import Header from '@/components/Header/Header';
import { useState } from 'react';

const Categories = () => {
  const [activeButton, setActiveButton] = useState('notice');
  const handleClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="flex">
      <button
        className={`w-1/2 border-b-[1px] pb-12px pt-13px text-center text-14px transition-colors duration-300 ${activeButton === 'notice' ? 'border-black' : 'text-gray-400'}`}
        onClick={() => handleClick('notice')}
      >
        내 키워드 알림
      </button>
      <button
        className={`w-1/2 border-b-[1px] pb-12px pt-13px text-center text-14px transition-colors duration-300 ${activeButton === 'setting' ? 'border-black' : 'text-gray-400'}`}
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