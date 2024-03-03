import { forwardRef, useState } from 'react';
import AlertText from '@/components/common/atom/AlertText';
import InputIconButton from '@/components/SignIn/molecule/InputIconButton';

// interface InputFormProps {
//   type: string;
//   title: string;
//   placeholder: string;
//   alretText:
//     | 'doubleCheckEmail'
//     | 'doubleCheckNickname'
//     | 'doubleCheckPassword'
//     | 'invalidValue'
//     | 'invalidEmail'
//     | 'invalidPassword'
//     | 'userDelete';
//   marginTop: string;
//   inputLabel: string;
//   onChange,
//   ref;
// }

const InputForm = (
  {
    marginTop = '0px',
    type = 'text',
    title,
    placeholder,
    value,
    inputLabel,
    alretText,
    onChange,
    iconDoubleCheck,
    iconEyeToggle,
    ...resProps
  },
  ref
) => {
  /* -------------------------------------------------------------------------- */
  // 인풋 아이콘, 스타일 상태 변수 관리
  const [isFocus, setIsFocus] = useState(false);
  const [isDoubleCheck, setIsDoubleCheck] = useState(iconDoubleCheck);
  const [isDelete, setIsDelete] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && ref.current) {
      ref.current.blur();
    }
  };

  const handleFocus = () => {
    setIsFocus(true);
    setIsDoubleCheck((state) => !state);
    setIsDelete((state) => !state);
  };
  const handleBlur = () => {
    setIsFocus(false);
    setIsDoubleCheck((state) => !state);
    setIsDelete((state) => !state);
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
        <label className="sr-only">{inputLabel}</label>
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
          iconDoubleCheck={iconDoubleCheck && isDoubleCheck}
          iconDelete={isDelete}
          iconEyeToggle={iconEyeToggle}
        />
      </div>
      <AlertText alertCase={alretText} />
    </div>
  );
};

const InputFormRef = forwardRef(InputForm);
export default InputFormRef;
