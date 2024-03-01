import { useRef } from 'react';
import AlertText from '@/components/common/atom/AlertText';
import {
  DoubleCheck,
  DeleteContent,
  EyeToggle,
} from '@/components/SignIn/molecule/ButtonIcon';

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
  // isDoubleCheck: boolean;
  // isDeleteContent: boolean;
  // isEyeToggle: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  type = 'text',
  title,
  placeholder,
  alretText,
  // isDoubleCheck = false,
  // isDeleteContent = false,
  // isEyeToggle = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // ESC 키가 눌렸을 때 입력 필드 포커스 해제
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && inputRef.current !== null) {
      inputRef.current.blur();
    }
  };
  return (
    <div>
      <div className="flex h-48px w-full justify-between border-b border-gray-300 ">
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="w-full pl-2.5 pr-2.5 text-14px"
          type={type}
          name={title}
          placeholder={placeholder}
        />
        <div className="px- flex gap-10px">
          <DoubleCheck isShow={true} />
          <DeleteContent isShow={true} />
          <EyeToggle isShow={true} />
        </div>
      </div>
      <AlertText alertCase={alretText} />
    </div>
  );
};

export default InputForm;
