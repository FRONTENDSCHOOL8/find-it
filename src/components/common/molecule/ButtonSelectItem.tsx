import IconSelectItem from '@/components/common/atom/IconSelectItem';

interface ButtonSelectItemProps {
  isClick?: boolean;
  firstName?: string;
  secondName?: string;
  onClick;
}

const ButtonSelectItem: React.FC<ButtonSelectItemProps> = ({
  isClick = false,
  firstName = '대분류 선택',
  secondName = '소분류 선택',
  onClick,
}) => {
  const commonStyle =
    'flex h-fit items-center truncate rounded-full px-14px py-6px text-10px';
  const isClickColor = '#4785ff';
  const defaultBlackColor = (isClick && isClickColor) || 'black';
  const firstDefaultBorder = (isClick && isClickColor) || '#666';
  const secondDefaultBorder = (isClick && isClickColor) || '#BCBCBC';

  return (
    <div className="flex gap-14px">
      <button
        onClick={onClick}
        className={commonStyle}
        type="button"
        style={{
          color: defaultBlackColor,
          border: `1px solid ${firstDefaultBorder}`,
        }}
      >
        {firstName}
        <IconSelectItem color={defaultBlackColor} />
      </button>
      <button
        onClick={onClick}
        className={commonStyle}
        type="button"
        style={{
          color: defaultBlackColor,
          border: `1px solid ${secondDefaultBorder}`,
        }}
      >
        {secondName}
        <IconSelectItem color={defaultBlackColor} />
      </button>
    </div>
  );
};

export default ButtonSelectItem;
