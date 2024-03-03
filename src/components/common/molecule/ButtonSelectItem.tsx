import { useState } from 'react';
import IconSelectItem from '@/components/common/atom/IconSelectItem';

interface ButtonSelectItemProps {
  firstName?: string;
  secondName?: string;
  onClickFirst?: () => void;
  onClickSecond?: () => void;
}

const ButtonSelectItem: React.FC<ButtonSelectItemProps> = ({
  firstName = '대분류 선택',
  secondName = '소분류 선택',
  onClickFirst,
  onClickSecond,
}) => {
  /* -------------------------------------------------------------------------- */
  // 버튼 선택시 스타일변경 & 상위 프롭 함수 실행
  const [isActiveFirst, setIsActiveFirst] = useState(false);
  const [isActiveSecond, setIsActiveSecond] = useState(false);
  const commonStyle =
    'flex h-fit items-center truncate rounded-full px-14px py-6px text-10px';
  const isActiveColor = '#4785ff';

  const onFirst = () => {
    setIsActiveFirst(true);
    if (onClickFirst) {
      onClickFirst();
    }
  };
  const onSecond = () => {
    setIsActiveSecond(true);
    if (onClickSecond) {
      onClickSecond();
    }
  };

  const firstTextColor = (!isActiveFirst && 'black') || isActiveColor;
  const firstBorderColor = (!isActiveFirst && '#666') || isActiveColor;
  const secondTextColor = (!isActiveSecond && 'black') || isActiveColor;
  const secondBorderColor = (!isActiveSecond && '#BCBCBC') || isActiveColor;

  /* -------------------------------------------------------------------------- */
  // jsx 반환
  return (
    <div className="flex gap-14px">
      <button
        onClick={onFirst}
        className={commonStyle}
        type="button"
        style={{
          color: firstTextColor,
          border: `1px solid ${firstBorderColor}`,
        }}
      >
        {firstName}
        <IconSelectItem color={firstTextColor} />
      </button>
      <button
        onClick={onSecond}
        className={commonStyle}
        type="button"
        style={{
          color: secondTextColor,
          border: `1px solid ${secondBorderColor}`,
        }}
      >
        {secondName}
        <IconSelectItem color={secondTextColor} />
      </button>
    </div>
  );
};

export default ButtonSelectItem;
