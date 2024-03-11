interface ButtonVariableProps {
  buttonText: string;
  variant:
    | 'submit'
    | 'disabled'
    | 'lineStyle'
    | 'blackSolidThin'
    | 'blackLineThin'
    | 'primarySolidThin';
  onClick?: (e: React.FormEvent<HTMLFormElement>) => void;
}
const ButtonVariable: React.FC<ButtonVariableProps> = ({
  buttonText = '확인',
  variant = 'normal',
  onClick,
  ...restProps
}) => {
  let buttonType: 'button' | 'reset' | 'submit' | undefined;
  let background, color, borderColor, width, height;
  switch (variant) {
    case 'submit':
      buttonType = 'submit';
      background = '#4785ff';
      color = 'white';
      borderColor = '#4785ff';
      width = '100%';
      height = '66px';
      break;
    case 'disabled':
      buttonType = 'button';
      background = '#666666';
      color = '#BCBCBC';
      borderColor = '#666666';
      width = '100%';
      height = '66px';

      break;
    case 'lineStyle':
      buttonType = 'button';
      background = 'white';
      color = '#4785ff';
      borderColor = '#4785ff';
      width = '334px';
      height = '66px';
      break;
    case 'blackSolidThin':
      buttonType = 'button';
      background = 'black';
      color = 'white';
      borderColor = 'black';
      width = '315px';
      height = '53px';
      break;
    case 'blackLineThin':
      buttonType = 'button';
      background = 'white';
      color = 'black';
      borderColor = 'black';
      width = '315px';
      height = '53px';
      break;
    case 'primarySolidThin':
      buttonType = 'button';
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
      onClick={onClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
      style={{
        width,
        height,
        background,
        color,
        border: `1px solid ${borderColor}`,
        borderRadius: '20px',
      }}
      disabled={variant === 'disabled'}
      {...restProps}
    >
      {buttonText}
    </button>
  );
};

export default ButtonVariable;
