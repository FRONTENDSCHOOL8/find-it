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
    onChange,
    alretText,
    ...resProps
  },
  ref
) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && ref.current) {
      ref.current.blur();
    }
  };

  const defaultColor = '#e4e4e4';
  const activeColor = '#4785ff';
  const borderColor = (isFocus && activeColor) || defaultColor;

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
        <InputIconButton />
      </div>
      <AlertText alertCase={alretText} />
    </div>
  );
};

const InputFormRef = forwardRef(InputForm);
export default InputFormRef;
