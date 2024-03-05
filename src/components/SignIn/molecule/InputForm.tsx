import { forwardRef, useState } from 'react';
import AlertText from '@/components/common/atom/AlertText';
import InputIconButton from '@/components/SignIn/molecule/InputIconButton';

interface InputFormProps {
  marginTop?: string;
  type?: string;
  title: string;
  placeholder: string;
  value: string;
  alertCase?:
    | 'doubleCheckEmail'
    | 'doubleCheckNickname'
    | 'doubleCheckPassword'
    | 'invalidValue'
    | 'invalidEmail'
    | 'invalidPassword'
    | 'userDelete'
    | '';

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconDoubleCheck?: boolean;
  iconDelete?: boolean;
  iconEyeToggle?: boolean;
  onClickDoubleCheck?: () => void;
  onClickDelete?: () => void;
  onClickEye?: () => void;
  disabledDoubleCheck?: boolean;
}

const InputForm: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputFormProps
> = (
  {
    marginTop = '0px',
    type = 'text',
    title,
    placeholder,
    value,
    alertCase,
    onChange,
    iconDoubleCheck,
    iconDelete,
    iconEyeToggle,
    onClickDoubleCheck,
    onClickDelete,
    onClickEye,
    disabledDoubleCheck,
    ...resProps
  },
  ref
) => {
  /* -------------------------------------------------------------------------- */
  // 인풋 접근시 색상 변경 , 포커스 아웃 효과
  const [isFocus, setIsFocus] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && typeof ref === 'object' && ref?.current) {
      ref.current.blur();
    }
  };

  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };

  const defaultColor = '#e4e4e4';
  const activeColor = '#4785ff';
  const borderColor = (isFocus && activeColor) || defaultColor;

  /* -------------------------------------------------------------------------- */
  // jsx 반환
  return (
    <div
      style={{
        marginTop: `${marginTop}`,
      }}
    >
      <div
        className="flex h-48px w-full items-center justify-between"
        style={{ borderBottom: `1.4px solid ${borderColor}` }}
      >
        <label className="sr-only">{title}</label>
        <input
          className="text-#989898 w-full pl-2.5 pr-2.5 text-14px"
          style={{ outline: 'none' }}
          ref={ref}
          type={type}
          name={title}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...resProps}
        />
        <InputIconButton
          iconDoubleCheck={!!iconDoubleCheck}
          iconDelete={!!iconDelete}
          iconEyeToggle={!!iconEyeToggle}
          onClickDoubleCheck={onClickDoubleCheck}
          onClickDelete={onClickDelete}
          onClickEye={onClickEye}
          disabledDoubleCheck={disabledDoubleCheck}
        />
      </div>
      <AlertText alertCase={alertCase} />
    </div>
  );
};

const InputFormRef = forwardRef(InputForm);
export default InputFormRef;
