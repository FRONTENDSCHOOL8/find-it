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

type ButtonType = 'button' | 'reset' | 'submit' | undefined;

const ButtonVariable: React.FC<ButtonVariableProps> = ({
  buttonText = '확인',
  variant = 'normal',
  onClick,
  ...restProps
}) => {
  const styles = {
    buttonType: 'button' as ButtonType,
    background: '',
    color: '',
    borderColor: '',
    width: '',
    height: '',
  };

  switch (variant) {
    case 'submit':
      styles.buttonType = 'submit';
      styles.background = '#4785ff';
      styles.color = 'white';
      styles.borderColor = '#4785ff';
      styles.width = '100%';
      styles.height = '66px';
      break;
    case 'disabled':
      styles.buttonType = 'button';
      styles.background = '#666666';
      styles.color = '#BCBCBC';
      styles.borderColor = '#666666';
      styles.width = '100%';
      styles.height = '66px';
      break;
    case 'lineStyle':
      styles.buttonType = 'button';
      styles.background = 'white';
      styles.color = '#4785ff';
      styles.borderColor = '#4785ff';
      styles.width = '334px';
      styles.height = '66px';
      break;
    case 'blackSolidThin':
      styles.buttonType = 'button';
      styles.background = 'black';
      styles.color = 'white';
      styles.borderColor = 'black';
      styles.width = '315px';
      styles.height = '53px';
      break;
    case 'blackLineThin':
      styles.buttonType = 'button';
      styles.background = 'white';
      styles.color = 'black';
      styles.borderColor = 'black';
      styles.width = '315px';
      styles.height = '53px';
      break;
    case 'primarySolidThin':
      styles.buttonType = 'button';
      styles.background = '#4785ff';
      styles.color = 'white';
      styles.borderColor = '#4785ff';
      styles.width = '315px';
      styles.height = '53px';
      break;
    default:
      break;
  }

  return (
    <button
      type={styles.buttonType}
      onClick={onClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
      style={{
        width: styles.width,
        height: styles.height,
        background: styles.background,
        color: styles.color,
        border: `1px solid ${styles.borderColor}`,
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
