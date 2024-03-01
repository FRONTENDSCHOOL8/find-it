import { useRef } from 'react';
import AlertText from '@/components/common/atom/AlertText';
import InputIconButton from '@/components/SignIn/molecule/InputIconButton';

interface InputFormProps {
  type: string;
  title: string;
  placeholder: string;
  alretText:
    | 'doubleCheckEmail'
    | 'doubleCheckNickname'
    | 'doubleCheckPassword'
    | 'invalidValue'
    | 'invalidEmail'
    | 'invalidPassword'
    | 'userDelete';
  marginTop: string;
}

const InputForm: React.FC<InputFormProps> = ({
  type = 'text',
  title,
  placeholder,
  alretText,
  marginTop = '0px',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // ESC 키가 눌렸을 때 입력 필드 포커스 해제
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && inputRef.current !== null) {
      inputRef.current.blur();
    }
  };
  return (
    <div
      style={{
        marginTop: `${marginTop}`,
      }}
    >
      <div className="flex h-48px w-full justify-between border-b border-gray-300 ">
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="text-#989898 w-full pl-2.5 pr-2.5 text-14px"
          type={type}
          name={title}
          placeholder={placeholder}
          style={{ outline: 'none' }}
        />
        <InputIconButton />
      </div>
      <AlertText alertCase={alretText} />
    </div>
  );
};

export default InputForm;
