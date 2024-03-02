const ButtonVariable = ({
  buttonType = 'button',
  buttonText = '확인',
  variant = 'normal',
  onClick,
  ...restProps
}) => {
  let background, color, borderColor, width, height;
  switch (variant) {
    case 'normal':
      background = '#4785ff';
      color = 'white';
      borderColor = '#4785ff';
      width = '100%';
      height = '66px';
      break;
    case 'disabled':
      background = '#666666';
      color = '#BCBCBC';
      borderColor = '#666666';
      width = '100%';
      height = '66px';
      break;
    case 'lineStyle':
      background = 'white';
      color = '#4785ff';
      borderColor = '#4785ff';
      width = '100%';
      height = '66px';
      break;
    case 'blackSolidThin':
      background = 'black';
      color = 'white';
      borderColor = 'black';
      width = '315px';
      height = '53px';
      break;
    case 'blackLineThin':
      background = 'white';
      color = 'black';
      borderColor = 'black';
      width = '315px';
      height = '53px';
      break;
    case 'primarySolidThin':
      background = '#4785ff';
      color = 'white';
      borderColor = '#4785ff';
      width = '315px';
      height = '53px';
      break;
    default:
      break;
  }

  return (
    <button
      type={buttonType}
      onClick={onClick}
      style={{
        width,
        height,
        background,
        color,
        border: `1px solid ${borderColor}`,
        borderRadius: '20px',
      }}
      {...restProps}
    >
      {buttonText}
    </button>
  );
};

export default ButtonVariable;
