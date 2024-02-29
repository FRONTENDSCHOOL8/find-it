export const ButtonVariable = ({
  buttonType = 'button',
  buttonText = '확인',
  variant = 'normal',
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

  const buttonTest = () => {
    alert('ButtonVariable: button type으로 쓰일때 클릭 테스트');
  };

  const onClickHandler = () => {
    if (buttonType === 'button') {
      buttonTest();
    }
  };

  return (
    <button
      type={buttonType}
      onClick={onClickHandler}
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
