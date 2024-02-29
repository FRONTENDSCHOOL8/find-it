import { IconSelectLocal } from '@/components/common/atom/IconSelectLocal';

export const ButtonSelectLocal = ({
  isClick = false,
  firstName = '대분류 선택',
  secondName = '소분류 선택',
}) => {
  const selectColor = '#4785ff';
  const blackColor = (isClick && selectColor) || 'black';
  const firstBorder = (isClick && selectColor) || '#666';
  const secondBorder = (isClick && selectColor) || '#BCBCBC';

  const buttonTestFirst = () => {
    alert('대분류 선택 테스트');
  };
  const buttonTestSecond = () => {
    alert('소분류 선택 테스트');
  };

  return (
    <div className="flex gap-14px">
      <button
        onClick={buttonTestFirst}
        className="flex items-center rounded-full px-14px py-6px text-10px"
        type="button"
        style={{
          color: blackColor,
          border: `1px solid ${firstBorder}`,
        }}
      >
        {firstName}
        <IconSelectLocal color={blackColor} />
      </button>
      <button
        onClick={buttonTestSecond}
        className="flex items-center rounded-full px-14px py-6px text-10px"
        type="button"
        style={{
          color: blackColor,
          border: `1px solid ${secondBorder}`,
        }}
      >
        {secondName}
        <IconSelectLocal color={blackColor} />
      </button>
    </div>
  );
};
