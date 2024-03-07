import { useState } from 'react';
import { IconDown, IconUp } from '@/components/Notice/Icons';

interface NoticeItemProps {
  title: string;
  date: string;
  bodytext: string;
}
const NoticeItem: React.FC<NoticeItemProps> = ({ title, date, bodytext }) => {
  const [isShow, setIsShow] = useState(false);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsShow(!isShow);
  };
  return (
    <li>
      <button
        className="flex h-66px w-full items-center justify-between"
        onClick={onClick}
      >
        <div className="flex flex-col text-left">
          <h3 className="text-14px text-black">{title}</h3>
          <span className="text-10px text-gray-400">{date}</span>
        </div>
        {(isShow && IconDown) || IconUp}
      </button>
      <p
        className="break-keep pb-16px text-12px leading-5 text-gray-700"
        style={{ display: (isShow && 'block') || 'none' }}
      >
        {bodytext}
      </p>
    </li>
  );
};

export default NoticeItem;
