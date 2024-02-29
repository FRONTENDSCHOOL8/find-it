import IconSelectItem from '@/components/common/atom/IconSelectItem';

interface ButtonSelectItemProps {
  isClick?: boolean;
  firstName?: string;
  secondName?: string;
  handleSelectList;
}

const ButtonSelectItem: React.FC<ButtonSelectItemProps> = ({
  isClick = false,
  firstName = '대분류 선택',
  secondName = '소분류 선택',
  handleSelectList,
}) => {
  const selectColor = '#4785ff';
  const blackColor = (isClick && selectColor) || 'black';
  const firstBorder = (isClick && selectColor) || '#666';
  const secondBorder = (isClick && selectColor) || '#BCBCBC';

  return (
    <div className="flex gap-14px">
      <button
        onClick={handleSelectList}
        className="flex items-center rounded-full px-14px py-6px text-10px"
        type="button"
        style={{
          color: blackColor,
          border: `1px solid ${firstBorder}`,
        }}
      >
        {firstName}
        <IconSelectItem color={blackColor} />
      </button>
      <button
        onClick={handleSelectList}
        className="flex items-center rounded-full px-14px py-6px text-10px"
        type="button"
        style={{
          color: blackColor,
          border: `1px solid ${secondBorder}`,
        }}
      >
        {secondName}
        <IconSelectItem color={blackColor} />
      </button>
    </div>
  );
};

export default ButtonSelectItem;
